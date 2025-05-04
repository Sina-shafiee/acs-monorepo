import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";

import { db } from "#/db";
import * as schema from "#/db/schema/auth";

import { parseCorsOrigins } from "#/utils/parse_cors_origins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	trustedOrigins: parseCorsOrigins(),
	plugins: [
		phoneNumber({
			allowedAttempts: 2,
			otpLength: 6,
			sendOTP: ({ phoneNumber, code }, request) => {
				// TODO: Implement sending OTP code via SMS
				console.log(phoneNumber, code);
			},
			signUpOnVerification: {
				getTempEmail: (phoneNumber) => {
					console.log("getTempEmail", phoneNumber);
					return `${phoneNumber}@my-site.com`;
				},
			},
		}),
	],
});
