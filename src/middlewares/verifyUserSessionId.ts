import { IUser } from "../@types";
import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

interface IVerifyUserSessionId {
  req: FastifyRequest;
  res: FastifyReply;
}

export const verifyUserSessionId = async ({
  req,
  res,
}: IVerifyUserSessionId) => {
  const sessionId = req.cookies.session_id;

  const userLogged = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first();

  if (!userLogged) return res.status(401).send({ message: "Unauthorized" });
};
