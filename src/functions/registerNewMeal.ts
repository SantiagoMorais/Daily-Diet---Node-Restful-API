import { FastifyRequest } from "fastify";

interface IRegisterNewMeal {
  title: string;
  description: string;
  inTheDiet: boolean;
  req: FastifyRequest;
}

export const registerNewMeal = async () => {};
