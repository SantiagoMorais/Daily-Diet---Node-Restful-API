import { IMeal, IRequestAndReply, IUser } from "../@types";
import { knex } from "../database";

export const listMeals = async ({ req, res }: IRequestAndReply) => {
  const sessionId = req.cookies.session_id;

  const userLogged: IUser = await knex<IUser>("users")
    .where({
      session_id: sessionId,
    })
    .first()
    .returning("user_id");

  const meals = await knex<IMeal>("meals")
    .where({ user_id: userLogged.user_id })
    .select(
      "title",
      "description",
      "in_the_diet",
      "created_at",
      "updated_at",
      "meal_id"
    );

  return res.status(200).send({ meals });
};
