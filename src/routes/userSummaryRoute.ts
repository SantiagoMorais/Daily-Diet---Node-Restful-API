import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { userSummary } from "../functions/userSummary";

export const userSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/summary",
    {
      preHandler: [verifySessionId],
    },
    async (req, res) => {
      await verifyUserSessionId({ req, res });

      await userSummary({ req, res });
    }
  );
};
