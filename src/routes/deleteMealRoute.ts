import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { verifyUserMealsPermission } from "../middlewares/verifyUserMealsPermission";
import { deleteMeal } from "../functions/deleteMeal";

export const deleteMealRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/meals/:mealId",
    {
      preHandler: [verifySessionId],
      schema: {
        params: z.object({
          mealId: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { mealId } = req.params;
      await verifyUserSessionId({ req, res });
      await verifyUserMealsPermission({ req, mealId: mealId, res });

      await deleteMeal({ mealId, res });
    }
  );
};
