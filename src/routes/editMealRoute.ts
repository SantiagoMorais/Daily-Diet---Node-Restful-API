import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { editMeal } from "../functions/editMeal";

export const editMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/meal/:meal_id",
    {
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

      await editMeal({ description, inTheDiet, title, res, mealId: meal_id });
    }
  );
};
