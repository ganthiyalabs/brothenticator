import { protectedProcedure, publicProcedure, router } from "../index";
import { recoveryCodesRouter } from "./recoverycodes";
import { qrScannerRouter } from "./qrcodescanner";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	recoveryCodes: recoveryCodesRouter,
  qrScanner: qrScannerRouter,
});
export type AppRouter = typeof appRouter;
