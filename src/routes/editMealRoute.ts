import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { editMeal } from "../functions/editMeal";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { verifyUserMealsPermission } from "../middlewares/verifyUserMealsPermission";

export const editMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/meal/:mealId",
    {
      preHandler: [verifySessionId],
      schema: {
        body: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          inTheDiet: z.boolean().optional(),
        }),
        params: z.object({
          mealId: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { title, description, inTheDiet } = req.body;
      const { mealId } = req.params;

      await verifyUserSessionId({ req, res });
      await verifyUserMealsPermission({ mealId, req, res });

      await editMeal({ description, inTheDiet, title, res, mealId });
    }
  );
};
