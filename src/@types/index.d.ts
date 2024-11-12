import { FastifyReply, FastifyRequest } from "fastify";

export interface IUser {
  user_id: string;
  name: string;
  email: string;
  password: string;
  session_id: string;
}

interface IBaseMeal {
  title: string;
  description: string;
  user_id: string;
  meal_id: string;
  created_at: string;
  updated_at: string | null;
}

export interface IMeal extends IBaseMeal {
  in_the_diet: boolean | null;
}

export interface IDatabaseReturnMeal extends IBaseMeal {
  in_the_diet: number | null;
}

export interface IReply {
  res: FastifyReply;
}

export interface IRequest {
  req: FastifyRequest;
}

export interface IRequestAndReply extends IReply, IRequest {}
