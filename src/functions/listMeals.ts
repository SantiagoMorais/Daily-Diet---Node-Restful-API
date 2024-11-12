import { IDatabaseReturnMeal, IMeal, IRequestAndReply, IUser } from "../@types";
import { knex } from "../database";

export const listMeals = async ({ req, res }: IRequestAndReply) => {
  const sessionId = req.cookies.session_id;

  const userLogged: IUser = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first()
    .returning("user_id");

  const meals = await knex<IDatabaseReturnMeal>("meals")
    .where({ user_id: userLogged.user_id })
    .select(
      "title",
      "description",
      "in_the_diet",
      "created_at",
      "updated_at",
      "meal_id"
    );

  const formattedMeals = meals.map((meal) => ({
    ...meal,
    in_the_diet: meal.in_the_diet === 1 ? true : false,
  }));  

  return res.status(200).send({ meals: formattedMeals });
};
