import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { env } from "#/config/env";
import { auth } from "#/lib/auth";
import { createContext } from "#/lib/context";
import { appRouter } from "#/router";

import { parseCorsOrigins } from "#/utils/parse_cors_origins";
import db from "./db";

const app = new Hono();
const { websocket, upgradeWebSocket } = createBunWebSocket();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: parseCorsOrigins(),
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	}),
);

app.get("/", (c) => {
	return c.text("OK");
});

/**
 * @description Get all OTPs tokens
 * @WARNING This is only for testing purposes
 * and should be removed before production
 * right now we are not using any otp service
 * so we need to get all the otps tokens
 * to test the app
 * @TODO: Remove this endpoint before production
 */
app.get("/otp-tokens", async (c) => {
	const verification = await db.query.verification.findMany({});

	return c.json({
		message: "OTPs tokens endpoint",
		verification,
	});
});

app.get(
	"/ws",
	upgradeWebSocket((c) => {
		return {
			onOpen(_event, ws) {
				ws.send("Welcome to the server");
			},
			onMessage(event, ws) {
				console.log(event.data);
			},
			onClose(evt, ws) {
				console.log("Client disconnected");
				ws.close();
			},
		};
	}),
);

export type AppRouter = typeof appRouter;

export default {
	port: env.PORT,
	websocket,
	fetch: app.fetch,
};
