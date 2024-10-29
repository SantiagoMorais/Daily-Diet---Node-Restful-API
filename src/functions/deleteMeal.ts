import { knex } from "../database";
import { IMeal, IReply } from "../@types";

interface IDeleteMeal extends IReply {
  mealId: string;
}

export const deleteMeal = async ({ res, mealId }: IDeleteMeal) => {
  await knex<IMeal>("meals").where({ meal_id: mealId }).delete();

  return res.status(204).send();
};
