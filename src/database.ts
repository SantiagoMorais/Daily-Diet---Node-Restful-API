import setupKnex from "knex";
import { env } from "./env";
import { Knex } from "knex";

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
  useNullAsDefault: true,
};

export const knex = setupKnex(config);
