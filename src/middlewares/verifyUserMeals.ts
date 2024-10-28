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

  const userLogged: IUser = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first()
    .returning("user_id");

  const userCanEditMeal = await knex<IMeal>("meals")
    .where({
      meal_id: mealId,
    })
    .andWhere({ user_id: userLogged.user_id })
    .first();

  console.log(userCanEditMeal);

  if (!userCanEditMeal)
    return res.status(401).send({ message: "Unauthorized" });
};
