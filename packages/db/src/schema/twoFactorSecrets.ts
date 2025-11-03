import { pgTable, uuid, boolean, timestamp, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import {user} from "./auth";

export const twoFactorSecretsTable = pgTable("two_factor_secrets", {
  secret_id: uuid("secret_id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  secret_key: text("secret_key").notNull(),
  is_2fa_enabled: boolean("is_2fa_enabled").notNull().default(false),
  enabled_at: timestamp("enabled_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
});
