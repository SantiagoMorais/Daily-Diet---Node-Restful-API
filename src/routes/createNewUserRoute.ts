import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createNewUser } from "../functions/createNewUser";

export const createNewUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        body: z
          .object({
            name: z.string().min(2),
            email: z.string().email(),
            password: z.string().min(6).max(15),
            repeatPassword: z.string().min(6).max(15),
          })
          .refine((data) => data.password === data.repeatPassword, {
            message: "The passwords not match.",
            path: ["repeatPassword"],
          }),
      },
    },
    async (req, res) => {
      const { email, name, password, repeatPassword } = req.body;

      await createNewUser({ email, name, password, repeatPassword, res });
    }
  );
};
