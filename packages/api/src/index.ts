import type { AppRouter } from "server";

import { type TRPCClient, createTRPCClient, httpBatchLink } from "@trpc/client";

/**
 * Creates a TRPC client for the given server URL.
 * @param serverUrl - The URL of the server to connect to
 * @returns A TRPC client for the given server URL.
 */
export function createApiClient(serverUrl: string): TRPCClient<AppRouter> {
	return createTRPCClient<AppRouter>({
		links: [
			httpBatchLink({
				url: `${serverUrl}/trpc`,
				fetch(url, options) {
					return fetch(url, {
						...options,
						credentials: "include",
					});
				},
			}),
		],
	});
}

export type { AppRouter };
