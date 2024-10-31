import { IRequestAndReply, IUser } from "../@types";
import { knex } from "../database";

export const profileData = async ({ req, res }: IRequestAndReply) => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) return res.status(401).send({ message: "Unauthorized!" });

  const userData = await knex<IUser>("users")
    .select("email", "name")
    .where({ session_id: sessionId })
    .first();

  if (!userData) return res.status(404).send({ message: "User not found!" });

  return res.status(200).send({ user: userData });
};
