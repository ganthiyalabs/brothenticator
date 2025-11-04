import { protectedProcedure, publicProcedure, router } from "../index";
import { recoveryCodesRouter } from "./recoverycodes";

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
});
export type AppRouter = typeof appRouter;
