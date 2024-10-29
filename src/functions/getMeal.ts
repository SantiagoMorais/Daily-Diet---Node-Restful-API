import { IMeal, IReply } from "../@types";
import { knex } from "../database";

interface IGetMeal extends IReply {
  mealId: string;
}

export const getMeal = async ({ res, mealId }: IGetMeal) => {
  const validMeal = await knex<IMeal>("meals")
    .select(
      "meal_id",
      "title",
      "description",
      "in_the_diet",
      "created_at",
      "updated_at"
    )
    .where({
      meal_id: mealId,
    })
    .first();

  if (!validMeal) return res.status(404).send({ message: "Meal not found" });

  return res.status(200).send({ meal: validMeal });
};
