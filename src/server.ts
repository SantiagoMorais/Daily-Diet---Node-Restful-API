import { app } from "./app";
import { knex } from "./database";
import { env } from "./env";

app.get("/hello", async (req, res) => {
    const test = await knex("meals")

    return test
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
