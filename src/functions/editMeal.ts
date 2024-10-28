import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { IMeal } from "../@types";

interface IEditMeal {
  res: FastifyReply;
  title?: string;
  description?: string;
  inTheDiet?: boolean;
  mealId: string;
}

export const editMeal = async ({
  res,
  title,
  description,
  inTheDiet,
  mealId,
}: IEditMeal) => {
  interface IUpdates {
    title?: string;
    description?: string;
    in_the_diet?: boolean;
  }

  const updates: IUpdates = {};

  const meal = await knex<IMeal>("meals").where({ meal_id: mealId }).first();

  if (!meal) return res.status(404).send({ message: "Meal not found" });
  if (!title && !description && inTheDiet === undefined)
    return res
      .status(400)
      .send({ message: "At least one field must be updated" });
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (inTheDiet === true || inTheDiet === false)
    updates.in_the_diet = inTheDiet;

  const currentDate = new Date().toLocaleString("pt-BR");

  await knex<IMeal>("meals").where({ meal_id: mealId }).update({updated_at: currentDate, ...updates});
  return res.status(204).send();
};
