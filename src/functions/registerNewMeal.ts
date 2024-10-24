import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { IMeal, IUser } from "../@types";
import { randomUUID } from "crypto";

interface IRegisterNewMeal {
  title: string;
  description: string;
  inTheDiet: boolean;
  req: FastifyRequest;
  res: FastifyReply;
}

export const registerNewMeal = async ({
  description,
  inTheDiet,
  req,
  title,
  res,
}: IRegisterNewMeal) => {
  switch (true) {
    case !description:
      return res.status(400).send({ message: "Description field required!" });
    case !title:
      return res.status(400).send({ message: "Title field required!" });
  }

  const sessionId = req.cookies.session_id;

  const user = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first();

  const currentDate = new Date().toLocaleString("pt-BR");

  await knex<IMeal>("meals").insert({
    user_id: user?.user_id,
    meal_id: randomUUID(),
    title,
    description,
    in_the_diet: inTheDiet,
    created_at: currentDate,
  });

  return res.status(201).send();
};
