import { relations } from "drizzle-orm";
import { user } from "./auth";
import { twoFactorSecretsTable } from "./twoFactorSecrets";

export const usersRelations = relations(user, ({ one, many }) => ({
  twoFactorSecret: one(twoFactorSecretsTable, {
    fields: [user.id],
    references: [twoFactorSecretsTable.user_id],
  }),
}));

export const twoFactorSecretsRelations = relations(twoFactorSecretsTable, ({ one }) => ({
  user: one(user, {
    fields: [twoFactorSecretsTable.user_id],
    references: [user.id],
  }),
}));


export * from "./twoFactorSecrets";
export * from "./auth";
