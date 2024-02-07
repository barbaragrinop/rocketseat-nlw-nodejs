import z from "zod";
import { FastifyInstance } from "fastify";

import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma";

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
        maxAge: 60 * 60 * 24 * 30, //30 days
        signed: true, //para assinar o cookie
        httpOnly: true, //pra não ser acessado pelo javascript
        // secure: true, //só vai ser enviado se a requisição for feita por https
      });
    }

    await prisma.vote.create({
      data: {
        pollOptionId,
        sessionId,
        pollId,
      },
    });

    return reply.status(201).send();
  });
}
