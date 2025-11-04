import { protectedProcedure, router } from "../index";
import { generateRecoveryCode } from "../utils/recoverycodes";
import { db } from "@brothenticator/db";
import { twoFactorSecretsTable } from "@brothenticator/db/schema/index";
import { eq } from "drizzle-orm";

export const recoveryCodesRouter = router({
  generate: protectedProcedure.mutation(async ({ ctx }) => {

    const secrets = await db
      .select()
      .from(twoFactorSecretsTable)
      .where(eq(twoFactorSecretsTable.user_id, ctx.session.user.id));


    const results = secrets.map((secret) => ({
      secret_id: secret.secret_id,
      issuer: secret.issuer,
      label: secret.label,
      code: generateRecoveryCode(
        secret.secret_key,
        secret.issuer,
        secret.label,
        secret.algorithm
      ),
    }));

    return results;
  }),
});

export type RecoveryCodesRouter = typeof recoveryCodesRouter;
