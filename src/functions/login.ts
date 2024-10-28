import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { IUser } from "../@types";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

interface ILogin {
  res: FastifyReply;
  req: FastifyRequest;
  email: string;
  password: string;
}

export const login = async ({ email, password, res, req }: ILogin) => {
  switch (true) {
    case !email:
      return res.status(400).send({ message: "Email field required." });
    case !password:
      return res.status(400).send({ message: "Password field required." });
  }

  const user = await knex<IUser>("users")
    .select()
    .where("email", email)
    .first();

  if (!user)
    return res.status(401).send({ message: "Email or password invalid" });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    return res.status(401).send({ message: "Email or password invalid" });

  let sessionId = req.cookies.session_id;

  if (!sessionId) {
    sessionId = randomUUID();

    res.cookie("session_id", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  await knex<IUser>("users").select().where("email", email).update({
    session_id: sessionId,
  });

  return res.status(200).send();
};
