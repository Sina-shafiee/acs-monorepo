import { publicProcedure, router } from "#/lib/trpc";

export const todoRouter = router({
	getAll: publicProcedure.query(() => {
		return [];
	}),
});
