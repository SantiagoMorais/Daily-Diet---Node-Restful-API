import { IMeal, IRequestAndReply, IUser } from "../@types";
import { knex } from "../database";

interface IVerifyUserMeals extends IRequestAndReply {
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
