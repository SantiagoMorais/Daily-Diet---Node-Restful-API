import { describe, it, beforeAll, afterAll, beforeEach, expect } from "vitest";
import { app } from "../src/app";
import request from "supertest";
import { execSync } from "child_process";

describe("Users routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new user", async () => {
    await request(app.server)
      .post("/users")
      .send({
        email: "test@gmail.com",
        name: "test test",
        password: "123456",
        repeatPassword: "123456",
      })
      .expect(201);
  });

  it("should be able to login an user", async () => {
    await request(app.server)
      .post("/users")
      .send({
        email: "test@gmail.com",
        name: "test test",
        password: "123456",
        repeatPassword: "123456",
      })
      .expect(201);

    await request(app.server)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "123456",
      })
      .expect(200);

    await request(app.server)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "invalidPassword",
      })
      .expect(401);
  });

  it("should be able to register a new meal", async () => {
    await request(app.server)
      .post("/users")
      .send({
        email: "test2@gmail.com",
        name: "test test",
        password: "123456",
        repeatPassword: "123456",
      })
      .expect(201);

    const loginUserResponse = await request(app.server)
      .post("/login")
      .send({
        email: "test2@gmail.com",
        password: "123456",
      })
      .expect(200);

    const cookies = loginUserResponse.get("Set-Cookie");

    if (!cookies) return;

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies)
      .send({
        title: "snack",
        description: "hamburger",
        inTheDiet: false,
      })
      .expect(201);
  });

  it("should be able to list meals", async () => {
    await request(app.server)
      .post("/users")
      .send({
        email: "test3@gmail.com",
        name: "test test",
        password: "123456",
        repeatPassword: "123456",
      })
      .expect(201);

    const loginUserResponse = await request(app.server)
      .post("/login")
      .send({
        email: "test3@gmail.com",
        password: "123456",
      })
      .expect(200);

    const cookies = loginUserResponse.get("Set-Cookie");

    if (!cookies) return;

    // Register a meal
    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies)
      .send({
        title: "snack",
        description: "hamburger",
        inTheDiet: false,
      })
      .expect(201);

    // Register another meal
    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies)
      .send({
        title: "snack2",
        description: "salad sandwich",
        inTheDiet: true,
      })
      .expect(201);

    const getMealsResponse = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies)
      .expect(200);

    expect(getMealsResponse.body.meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "snack",
          description: "hamburger",
          in_the_diet: 0,
        }),
        expect.objectContaining({
          title: "snack2",
          description: "salad sandwich",
          in_the_diet: 1,
        }),
      ])
    );
  });
});
