import knex from "knex";
import { IUser } from "../@types";
import { FastifyReply, FastifyRequest } from "fastify";

interface IVerifyUserSessionId {
  res: FastifyReply;
  req: FastifyRequest;
}

export const verifyUserSessionId = async ({
  res,
  req,
}: IVerifyUserSessionId) => {
  const sessionId = req.cookies.session_id;

  const userLogged = await knex<IUser>("users")
    .select()
    .where("session_id", sessionId)
    .first();

  if (!userLogged) return res.status(401).send({ message: "Unauthorized" });
};
