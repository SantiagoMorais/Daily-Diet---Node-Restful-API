import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";

export const checkAuth: FastifyPluginAsyncZod = async (app) => {
  app.get("/auth/status", { preHandler: [verifySessionId] }, (req, res) => {
    verifyUserSessionId({ req, res });

    return res.status(200).send({ message: "Authenticated!" });
  });
};
