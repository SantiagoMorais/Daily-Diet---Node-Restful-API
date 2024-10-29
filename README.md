# Daily Diet - Node Restful API

![banner]()

## Sumário

- [Bibliotecas](#bibliotecas)
  - [Dependências](#dependencias)
  - [Dependências de desenvolvimento](#dependencias-de-desenvolvimento)
- [Requisitos da aplicação](#requisitos-da-aplicacao)
- [Funcionalidade](#funcionalidade)
- [Rotas](#rotas)
  - [POST - Criar usuário](#post---criar-usuário)
  - [POST - Login](#post---login)
  - [POST - Criar nova refeição](#post---criar-nova-refeição)
  - [PUT - Editar os dados de uma refeição](#put---editar-os-dados-de-uma-refeição)
  - [DELETE - Deletar uma refeição](#delete---deletar-uma-refeição)
  - [GET - Listar refeições](#get---listar-refeições)
  - [GET - Visualizar uma refeição](#get---visualizar-uma-refeição)
  - [GET - User Summary](#get---user-summary)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Autor](#autor)

## Bibliotecas

### Dependências

- [Fastify](https://fastify.dev): Framework web para Node.js usado para criar APIs e servidores HTTP (similar ao Express.js) e possio suporte à tipagem TypeScript.

- [Knex](https://knexjs.org): **SQL query builder** utilizado para simplificar a linguagem sql. É um construtor de queries, que facilita a escrita do código usando javascript. Similar a um ORM.

- [dotenv](https://www.npmjs.com/package/dotenv): Dotenv carrega variáveis ambiente de um arquivo .env ao `process.env` em aplicações Node.js.

- [zod](https://zod.dev/): Biblioteca de validação de esquemas e dados, garantindo a segurança dos dados.

- [Fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod): Integra o **Zod** com o **Fastify**, permitindo validar e tipar dados das requisições HTTP para evitar erros. Usa validações do Zod para definir e validar o `body`, `params`, `query` e `headers` das requisições.

- [@fastify/cookie](https://github.com/fastify/fastify-cookie): Um plugin para o Fastify que adiciona suporte para ler e definir cookies.

### Dependências de desenvolvimento

- [ESLint](https://eslint.org/): Ferramenta para análise de código, responsável por identificar erros e inconsistências, como variáveis não utilizadas ou não declaradas.

- [Prettier](https://prettier.io/): Ferramenta de formatação de código como indentação, espaçamento, uso de aspas simples ou duplas, etc, garantindo consistência no estilo do código.

- [Vitest](https://vitest.dev): Um framework de test nativo do vite, mas mais rápido que Jest. Apesar disso, a migração do Jest ao Vitest é simples, pois a sintaxe é extremamente similar.

- [tsx](https://tsx.is): TSX significa _Typescript Execute_, servindo como um executor node para rodar código Typescript.

- [Supertest](https://www.npmjs.com/package/supertest): A motivação com este módulo é fornecer uma abstração de alto nível para testar HTTP, ao mesmo tempo que permite acessar a API de nível inferior fornecida pelo `superagent`. Ou seja, testar o servidor sem precisar rodá-lo em uma porta específica, evitando conflitos.

## Requisitos da aplicação

- [ X ] Deve ser possível criar um usuário

  - name
  - email
  - user_id
  - password
  - repeat_password
  - session_id

- [ X ] Deve ser possível identificar o usuário entre as requisições
- [ X ] Deve ser possível registrar uma refeição feita, com as seguintes informações: _As refeições devem ser relacionadas a um usuário._

  - meal_id
  - user_id
  - title
  - description
  - in_the_diet (Está dentro ou não da dieta)
  - created_at (Data e hora)
  - updated_at

- [ X ] Deve ser possível listar todas as refeições de um usuário
- [ X ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ X ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário

  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Funcionalidade

## Rotas

### POST - Criar usuário

- Rota: `"/users"`
- Método: `POST`
- Objetivo: Criar novo usuário

```ts
// Criptografando a senha antes de adicioná-la ao banco.
const salt = await bcrypt.genSalt(12);
const passwordHash = await bcrypt.hash(password, salt);

// O session_id por enquanto não é definido e só será durante a realização do login.
await knex<IUser>("users").insert({
  email,
  name,
  password: passwordHash,
  user_id: randomUUID(),
});
```

### POST - Login

- Rota: `"/login"`
- Método: `POST`
- Objetivo: Realizar o login do usuário para que possa cadastrar refeições

Utilizado sistema de login para atenticar usuários.
Atualizando o `session_id` para um `id` válido e o enviando para os `cookies` através do [@fastify/cookie](https://github.com/fastify/fastify-cookie).

```ts
let sessionId = req.cookies.session_id;

if (!sessionId) {
  sessionId = randomUUID();

  res.cookie("session_id", sessionId, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day - O maxAge define em segundos a duração do cookie.
  });
}

await knex<IUser>("users").select().where("email", email).update({
  session_id: sessionId,
});
```

### POST - Criar nova refeição

- Rota: `"/meals"`
- Método: `POST`
- Objetivo: Criar nova refeição feita

### PUT - Editar os dados de uma refeição

- Rota: `"/meals/:meal_id"`
- Método: `PUT`
- Objetivo: Editar os dados de uma refeição

### DELETE - Deletar uma refeição

- Rota: `"/meals/:meal_id"`
- Método: `DELETE`
- Objetivo: Deletar uma refeição

### GET - Listar refeições

- Rota: `"/meals"`
- Método: `GET`
- Objetivo: Listar todas as refeições de um usuário

### GET - Visualizar uma refeição

- Rota: `"/meals/meal_id"`
- Método: `GET`
- Objetivo: Listar uma refeição específica de um usuário pelo id

### GET - User Summary

- Rota: `"/summary"`
- Método: `GET`
- Objetivo: Listar um resumo do usuário, incluindo:
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

## Como rodar o projeto

- Instalar as dependências `npm install`
- Criar o arquivo `.env` e `.env.test` caso queira realizar os testes `e2e` da aplicação. Configure as variáveis ambiente como demonstra o arquivo `.env.example` e `.env.test.example`.
- Executar as migrations `npm run knex migrate:latest`
- Executar o servidor `npm run server`

## Autor

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- Linkedin - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Instagram - [@felipe.santiago.morais](https://www.instagram.com/felipe.santiago.morais)
- Email - <a href="mailto:contatofelipesantiago@gmail.com" target="blank">contatofelipesantiago@gmail.com</a>
- <a href="https://api.whatsapp.com/send?phone=5531996951033&text=Hi%2C%20Felipe%21%20I%20got%20your%20contact%20from%20your%20portfolio.">Whatsapp</a>
