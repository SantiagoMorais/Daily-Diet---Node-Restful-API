import { table } from "console";
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.uuid("meal_id").primary();
    table.uuid("user_id").notNullable();
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.boolean("in_the_diet").notNullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}
