import { z } from "zod";
import { config } from "dotenv";

const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
config({ path: envPath });

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "test", "development"]).default("production"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Invalid environment variables!", _env.error.format());
  throw new Error("Invalid environment variabels!");
}

export const env = _env.data;