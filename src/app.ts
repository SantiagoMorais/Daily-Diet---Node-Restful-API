import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createNewUserRoute } from "./routes/createNewUserRoute";
import { loginRoute } from "./routes/loginRoute";
import cookie from "@fastify/cookie";
import { registerNewMeal } from "./routes/registerNewMeal";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cookie);

app.register(createNewUserRoute);
app.register(loginRoute);
app.register(registerNewMeal);
