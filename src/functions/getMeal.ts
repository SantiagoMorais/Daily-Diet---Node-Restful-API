import { IMeal, IReply } from "../@types";
import { knex } from "../database";

interface IGetMeal extends IReply {
  mealId: string;
}

export const getMeal = async ({ res, mealId }: IGetMeal) => {
  const validMeal = await knex<IMeal>("meals")
    .select()
    .where({
      meal_id: mealId,
    })
    .first();

  if (!validMeal) return res.status(404).send({ message: "Meal not found" });

  const { user_id, ...rest }: IMeal = validMeal; // removing user_id
  const meal = {...rest, in_the_diet: 1 ? true : false} // changing the return of in_the_diet to true or false instead of 1 or 0

  return res
    .status(200)
    .send({ meal });
};
