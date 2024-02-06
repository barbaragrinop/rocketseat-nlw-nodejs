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



    https://hoppscotch.io/ - requisição pra api pelo navegador
    como ele está usando pelo endereço dns deles, não vai conseguir acessar o localhost

    config > extensoes > instalar o browser que vc tá usando
    * use a extensão do navegador

# Zod

    biblioteca de validação de dados
    </> npm i zod
