import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createNewUserRoute } from "./routes/createNewUserRoute";
import { loginRoute } from "./routes/loginRoute";
import cookie from "@fastify/cookie";
import { registerNewMealRoute } from "./routes/registerNewMealRoute";
import { editMealRoute } from "./routes/editMealRoute";
import { listMealsRoute } from "./routes/listMealsRoute";
import { deleteMealRoute } from "./routes/deleteMealRoute";
import { getMealRoute } from "./routes/getMealRoute";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cookie);

app.register(createNewUserRoute);
app.register(loginRoute);
app.register(registerNewMealRoute);
app.register(editMealRoute);
app.register(listMealsRoute);
app.register(deleteMealRoute);
app.register(getMealRoute);
