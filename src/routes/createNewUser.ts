import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export const createNewUser: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        body: z
          .object({
            name: z.string().min(2),
            email: z.string().email(),
            password: z.string().min(6).max(15),
            repeat_password: z.string().min(6).max(15),
          })
          .refine((data) => data.password === data.repeat_password, {
            message: "The passwords not match.",
            path: ["repeat_password"],
          }),
      },
    },
    async (req, res) => {
      const { email, name, password, repeat_password } = req.body;

      if (password !== repeat_password)
        return res.status(400).send({ message: "The passwords not match." });

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await knex("users").insert({
        user_id: randomUUID(),
        email,
        name,
        password: passwordHash,
      });

      return res.status(201).send();
    }
  );
};
