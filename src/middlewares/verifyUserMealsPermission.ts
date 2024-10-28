import { IMeal, IUser } from "../@types";
import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

interface IVerifyUserMeals {
  req: FastifyRequest;
  res: FastifyReply;
  mealId: string;
}

export const verifyUserMealsPermission = async ({
  mealId,
  req,
  res,
}: IVerifyUserMeals) => {
  const sessionId = req.cookies.session_id;

  const userLogged: { user_id: string } = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first()
    .select("user_id");

  const userCanEditMeal = await knex<IMeal>("meals")
    .where({
      meal_id: mealId,
    })
    .andWhere({ user_id: userLogged.user_id })
    .first();

  if (!userCanEditMeal)
    return res.status(401).send({ message: "Unauthorized" });
};
