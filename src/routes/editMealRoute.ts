import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { editMeal } from "../functions/editMeal";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { verifyUserMealsPermission } from "../middlewares/verifyUserMeals";

export const editMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/meal/:meal_id",
    {
      preHandler: [verifySessionId],
      schema: {
        body: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          inTheDiet: z.boolean().optional(),
        }),
        params: z.object({
          meal_id: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { title, description, inTheDiet } = req.body;
      const { meal_id } = req.params;

      await verifyUserSessionId({req, res});
      await verifyUserMealsPermission({ mealId: meal_id, req, res });

      await editMeal({ description, inTheDiet, title, res, mealId: meal_id });
    }
  );
};
