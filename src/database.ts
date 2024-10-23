import setupKnex from "knex";
import { env } from "./env";

export const knex = setupKnex({
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL,
    port: env.PORT,
  },
  useNullAsDefault: true,
});
