# Converter o TS pra JS e executa o código com node de forma automatizada

    npm install tsx -D
    /package.json > "dev": "tsx watch src/http/server.ts"

# Pra criar aplicaçãop web no Node, fastify

    sistema de roteamento?

# Docker

    Container -> Uma instancia pra cada aplicação

    </> docker ps
    ver se tem container rodando

    </> docker -v
    versão do docker

    - image: uma receita pra confiurar o postgres no linux em um ambiente zerado
    - ports: redirecionamento de porta de serviço
    - environment: dados do ambiente
    - volumes: sistema de storage- quando subir o sistema do postgres, vai fazer com que persista os dados.

    </> docker compose up -d
    rodar o docker em modo detached, roda e deixa o container rodando em background
    vai ficar rodando até vc pedir pra parar de rodar

    </> docker logs containerid
    ver os logs do container

# Formas mais comuns conectar com Banco de Dados

    > Driver nativo (ex.: postgres-js)
        Camada mais baixo nível. você vai escrever o comando diretamente

    > ORMs - Object Relational Mappers (ex.: Prisma)
        São biblioteca que trazem um leque de ferramentas pra se trabalhar com banco de dados

# Prisma

    > é um ORM

    </> npm i -D prisma
    Instala o Prisma

    </> npx prisma init
    Cria o arquivo.env e uma pasta pra ele

    Na .env, precisa trocar os valores para que reflita os referentes ao que foi escrito nas environments do arquivo de docker

    >> DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    johndoe: user | randompassword: password | mydb: nome do banco

    >> DATABASE_URL="postgresql://docker:docker@localhost:5432/polls?schema=public"


    </> npx prisma migrate dev
    para pegar o arquivo .prisma e transformar pro banco de dados
    cria migration

    </> npx prisma studio
    abre uma interface pro prisma para visualizar


    ```
        {

            "statusCode": 500,
            "code": "P2021",
            "error": "Internal Server Error",
            "message": "\nInvalid `prisma.vote.findUnique()` invocation in\nc:\\Users\\PC\\Desktop\\nlw-expert\\src\\http\\routes\\vote-on-poll.ts:24:56\n\n 21 let { sessionId } = request.cookies;\n 22 \n 23 if (sessionId) {\n→ 24 const userPreviousVoteOnPoll = await prisma.vote.findUnique(\nThe table `public.Vote` does not exist in the current database."
        }

    ``` -> </> npx prisma db push


    https://hoppscotch.io/ - requisição pra api pelo navegador
    como ele está usando pelo endereço dns deles, não vai conseguir acessar o localhost

    config > extensoes > instalar o browser que vc tá usando
    * use a extensão do navegador

# Zod

    biblioteca de validação de dados
    </> npm i zod

# Radis

    </> npm i ioredis

# Webbsocket

    Pub/Sub - Publish
        É um evento com efeito colateral. É um pattern onde eu publico mensagens em uma lista e dividdo essas mensagens em canais, categorizar as mensages
        Todas as mensagens que forem postadas nop canal com Id 1, só os que estiverem assinados no canal 1 vão ouvir as mensagens

        Por isso que é muito utilizado quando se precisa categorizar os eventos (chat de conversa)


