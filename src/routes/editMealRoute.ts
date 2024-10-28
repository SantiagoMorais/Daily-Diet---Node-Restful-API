import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const editMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/meal/:meal_id",
    {
      schema: {
        body: z.object({
          title: z.string(),
          description: z.string(),
          inTheDiet: z.boolean(),
        }),
      },
    },
    async (req, res) => {
      const { title, description, inTheDiet } = req.body;
    }
  );
};
