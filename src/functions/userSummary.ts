import { IMeal, IRequestAndReply, IUser } from "../@types";
import { knex } from "../database";

export const userSummary = async ({ req, res }: IRequestAndReply) => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) return res.status(401).send({ message: "Unauthorized" });

  const user = await knex<IUser>("users")
    .select()
    .where({
      session_id: sessionId,
    })
    .first();

  if (!user) return res.status(401).send({ message: "Unauthorized" });

  const { user_id }: IUser = user;

  const mealsData = await knex<IMeal>("meals").select().where({
    user_id,
  });

  const mealsInTheDiet = mealsData.filter((meal) => meal.in_the_diet).length;
  const mealsOutTheDiet = mealsData.filter((meal) => !meal.in_the_diet).length;

  const bestDietSequency = (): number => {
    let bestSequency = 0;
    let currentSequency = 0;

    mealsData.map((meal) => {
      if (meal.in_the_diet) {
        currentSequency++; // when the current meal is in the diet the current sequency increases
        if (currentSequency > bestSequency) bestSequency = currentSequency; // if the best sequency is smaller than the current one, update it
      } else if (!meal.in_the_diet) {
        currentSequency = 0; // if the current meal is out the diet, reset the current sequency
      }
    });
    return bestSequency;
  };

  const summary = {
    mealsRegistered: mealsData.length,
    mealsInTheDiet,
    mealsOutTheDiet,
    bestDietSequency: bestDietSequency(),
  };

  return res.status(200).send({ summary });
};
