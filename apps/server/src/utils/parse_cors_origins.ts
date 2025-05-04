import { env } from "#/config/env";

export function parseCorsOrigins(): string[] {
	return env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
}
