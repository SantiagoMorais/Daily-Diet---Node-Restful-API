import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifySessionId } from "../middlewares/verifySessionId";
import { verifyUserSessionId } from "../middlewares/verifyUserSessionId";
import { profileData } from "../functions/profileData";

export const profileDataRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/users/profile",
    { preHandler: [verifySessionId] },
    async (req, res) => {
      await verifyUserSessionId({ req, res });

      await profileData({req, res})
    }
  );
};
