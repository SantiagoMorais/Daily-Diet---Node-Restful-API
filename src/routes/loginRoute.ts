import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { login } from "../functions/login";

export const loginRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { email, password } = req.body;

      await login({ email, password, res, req });
    }
  );
};
