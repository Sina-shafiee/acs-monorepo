import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const stringBoolean = z.coerce
	.string()
	.transform((val) => {
		return val === "true";
	})
	.default("false");

export const env = createEnv({
	server: {
		CORS_ORIGIN: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		NODE_ENV: z.enum(["production", "development"]).default("development"),
		PORT: z.coerce
			.string()
			.transform(Number)
			.pipe(z.number().int().positive())
			.default("3001"),

		DB_SEEDING: stringBoolean,
		DB_MIGRATING: stringBoolean,

		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().min(1),
	},
	runtimeEnv: process.env,
});
