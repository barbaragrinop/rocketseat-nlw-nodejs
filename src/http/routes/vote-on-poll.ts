import z from "zod";
import { FastifyInstance } from "fastify";

import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";
import { votingPubSub } from "../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });
    const { pollId } = voteOnPollParams.parse(request.params);

    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      });

      //se o usuário já votou e o voto dele é diferente do que ele está tentando votar
      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.pollOptionId !== pollOptionId
      ) {
        //Apagar o voto anterior e criar um novo
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          },
        });

        //reduz a pontuação antiga
        const score = await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId);


        votingPubSub.publish(pollId, {
          pollOptionId: userPreviousVoteOnPoll.pollOptionId,
          votes: Number(score),
        })

      } else if (userPreviousVoteOnPoll) {
        return reply.status(401).send({
          message: "User already voted on this poll",
        });
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    });

    const score = await redis.zincrby(pollId, 1, pollOptionId);

    votingPubSub.publish(pollId, {
      pollOptionId,
      votes: Number(score),
    })

    return reply.status(201).send();
  });
}
