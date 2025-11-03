import { relations } from "drizzle-orm";
import { user } from "./auth";
import { twoFactorSecretsTable } from "./twoFactorSecrets";
import { recoveryCodesTable } from "./recoveryCodes";

export const usersRelations = relations(user, ({ one, many }) => ({
  twoFactorSecret: one(twoFactorSecretsTable, {
    fields: [user.id],
    references: [twoFactorSecretsTable.user_id],
  }),
  recoveryCodes: many(recoveryCodesTable),
}));

export const twoFactorSecretsRelations = relations(twoFactorSecretsTable, ({ one }) => ({
  user: one(user, {
    fields: [twoFactorSecretsTable.user_id],
    references: [user.id],
  }),
}));

export const recoveryCodesRelations = relations(recoveryCodesTable, ({ one }) => ({
  user: one(user, {
    fields: [recoveryCodesTable.user_id],
    references: [user.id],
  }),
}));

export * from "./twoFactorSecrets";
export * from "./recoveryCodes";
export * from "./auth";
