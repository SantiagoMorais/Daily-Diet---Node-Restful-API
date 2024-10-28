import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";

export const listMealsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/meals", { preHandler: [verifySessionId] }, async (req, res) => {
    await verifyUserSessionId({ req, res });

    
  });
};
