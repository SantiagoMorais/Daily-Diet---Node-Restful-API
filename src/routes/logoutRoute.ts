import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifySessionId } from "../middlewares/verifySessionId";

export const logoutRoute: FastifyPluginAsyncZod = async (app) => {
  app.post("/logout", { preHandler: [verifySessionId] }, (req, res) => {
    res.clearCookie("session_id");
    return res.status(200).send({ message: "Logged out successfully." });
  });
};
