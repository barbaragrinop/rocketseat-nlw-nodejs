type Message = { pollOptionId: string, votes: number }
type Subscriber = (message: Message) => void

//é um pattern que publica mensagens para vários inscritos
class VotingPuSub {
    private channels: Record<string, Subscriber[]> = {}
    //cada channel por ter vários inscritos    

    subscribe(pollid: string, subscriber: Subscriber) {
        if (!this.channels[pollid]) { //se não tiver ninguém inscrito
            this.channels[pollid] = []
        }

        this.channels[pollid].push(subscriber) //adiciona o inscrito no canal
    }

    publish(pollId: string, message: Message) {
        if (!this.channels[pollId]) {
            return
        }

        for (const subscriber of this.channels[pollId]) { //para cada inscrito no canal
            subscriber(message)
        }
    }
}

export const votingPubSub = new VotingPuSub() //exporta a instância do VotingPubSub