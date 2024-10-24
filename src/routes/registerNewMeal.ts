import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const registerNewMeal: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/meals",
    {
      schema: {
        body: z.object({
          title: z.string().min(2).max(30),
          description: z.string().min(2).max(100),
          inTheDiet: z.boolean(),
        }),
      },
    },
    async (req, res) => {
      const { description, inTheDiet, title } = req.body;
    }
  );
};
