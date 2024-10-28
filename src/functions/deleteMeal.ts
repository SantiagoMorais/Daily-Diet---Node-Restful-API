import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { IMeal } from "../@types";

interface IDeleteMeal {
  res: FastifyReply;
  mealId: string;
}

export const deleteMeal = async ({ res, mealId }: IDeleteMeal) => {
  await knex<IMeal>("meals").where({ meal_id: mealId }).delete();

  return res.status(204).send();
};
