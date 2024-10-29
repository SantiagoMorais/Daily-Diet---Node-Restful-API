import { IRequestAndReply, IUser } from "../@types";
import { knex } from "../database";

export const verifyUserSessionId = async ({
  req,
  res,
}: IRequestAndReply) => {
  const sessionId = req.cookies.session_id;

  const userLogged = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first();

  if (!userLogged) return res.status(401).send({ message: "Unauthorized" });
};
