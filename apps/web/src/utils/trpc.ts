import { type AppRouter, createApiClient } from "@acs/api";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({}),
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const trpcClient = createApiClient(process.env.NEXT_PUBLIC_SERVER_URL!);

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
