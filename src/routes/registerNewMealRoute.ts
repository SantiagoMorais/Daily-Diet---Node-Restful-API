import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { registerNewMeal } from "../functions/registerNewMeal";

export const registerNewMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/meals",
    {
      preHandler: [verifySessionId, verifyUserSessionId],
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

      await registerNewMeal({ description, inTheDiet, title, req, res });
    }
  );
};
