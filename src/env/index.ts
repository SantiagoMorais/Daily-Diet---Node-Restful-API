import { z } from "zod";
import "dotenv";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
