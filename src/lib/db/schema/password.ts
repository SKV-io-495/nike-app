import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./user";

export const passwords = pgTable("passwords", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  hashedPassword: text("hashedPassword").notNull(),
});
