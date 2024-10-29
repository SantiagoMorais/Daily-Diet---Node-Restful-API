import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { verifyUserMealsPermission } from "../middlewares/verifyUserMealsPermission";
import { getMeal } from "../functions/getMeal";

export const getMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/meals/:meal_id",
    {
      preHandler: [verifySessionId],
      schema: {
        params: z.object({
          meal_id: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { meal_id } = req.params;
      await verifyUserSessionId({ req, res });
      await verifyUserMealsPermission({ mealId: meal_id, req, res });

      await getMeal({ res, mealId: meal_id });
    }
  );
};
