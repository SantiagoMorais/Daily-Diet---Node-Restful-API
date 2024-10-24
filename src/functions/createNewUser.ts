import { FastifyReply } from "fastify";
import { knex } from "../database";
import { IUser } from "../@types";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

interface ICreateNewUser {
  res: FastifyReply;
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

export const createNewUser = async ({
  res,
  email,
  name,
  password,
  repeatPassword,
}: ICreateNewUser) => {
  switch (true) {
    case !email:
      return res.status(400).send({ message: "Email field is required" });
    case !name:
      return res.status(400).send({ message: "Name field is required" });
    case !name.includes(" "):
        return res.status(400).send({message: "Please, fill in the name field at least your name and last name."})
    case !password:
      return res.status(400).send({ message: "Password field is required" });
    case !repeatPassword:
      return res
        .status(400)
        .send({ message: "The password confirmation field is required" });
    case password !== repeatPassword:
      return res.status(400).send({ message: "The passwords don't match" });
  }

  const emailExist = await knex<IUser>("users").where("email", email).first();

  if (emailExist)
    return res.status(409).send({
      message: "This email is already registered. Please, choose another one.",
    });

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  await knex<IUser>("users").insert({
    email,
    name,
    password: passwordHash,
    user_id: randomUUID(),
  });

  res.status(201).send();
};
