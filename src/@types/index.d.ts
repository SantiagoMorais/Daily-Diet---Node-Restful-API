import { FastifyReply, FastifyRequest } from "fastify";

export interface IUser {
  user_id: string;
  name: string;
  email: string;
  password: string;
  session_id: string;
}

export interface IMeal {
  title: string;
  description: string;
  in_the_diet: boolean | null;
  user_id: string;
  meal_id: string;
  created_at: string;
  updated_at: string | null;
}

export interface IRequestAndReply {
  req: FastifyRequest;
  res: FastifyReply;
}
