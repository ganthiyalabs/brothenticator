import { pgTable, uuid, varchar, boolean, timestamp, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import {user} from "./auth";

export const recoveryCodesTable = pgTable("recovery_codes", {
  code_id: uuid("code_id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: text("user_id").notNull().references(() =>user.id, { onDelete: "cascade" }),
  code_hash: varchar("code_hash", { length: 255 }).notNull(),
  site_name: varchar("site_name", { length: 128 }),
  is_used: boolean("is_used").notNull().default(false),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
});
