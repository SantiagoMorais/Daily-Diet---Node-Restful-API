import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";

export const userSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/summary",
    {
      preHandler: [verifySessionId],
    },
    async (req, res) => {
      await verifyUserSessionId({ req, res });
    }
  );
};
