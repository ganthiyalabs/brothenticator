import { protectedProcedure, router } from "../index";
import { parseTOTPURI } from "../utils/TOTPparser";
import {db} from "@brothenticator/db";
import {twoFactorSecretsTable} from "@brothenticator/db/schema/index";
import {z} from "zod"

export const qrScannerRouter = router({
  parser:protectedProcedure
    .input(
      z.object({
        url: z.url("must be a valid string")
      })
    )
    .mutation(async ({ctx,input}) => {
      const {url} = input
      const parsedUrl = parseTOTPURI(url)
      const userId = ctx.session.user.id
      await db
      .insert(twoFactorSecretsTable)
      .values({
        user_id: userId,
        secret_key: parsedUrl.secret,
        issuer: parsedUrl.issuer || "",
        digits:parsedUrl.digits,
        period: parsedUrl.period,
        algorithm: parsedUrl.algorithm,
        label: parsedUrl.label || ""
      })

      return { success: true }
    })
})
