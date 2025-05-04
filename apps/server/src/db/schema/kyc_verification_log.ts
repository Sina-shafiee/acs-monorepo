import { relations } from "drizzle-orm";

import {
	index,
	integer,
	json,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import userKycVerification from "./user_kyc_verification";

const kycVerificationLog = pgTable(
	"kyc_verification_logs",
	{
		id: serial("id").primaryKey(),

		verificationId: integer("verification_id")
			.references(() => userKycVerification.id, { onDelete: "cascade" })
			.notNull(),

		verificationMethod: integer("verification_method").notNull(),

		requestPayload: json("request_payload"),
		responsePayload: json("response_payload"),

		status: integer("status").notNull(),

		note: varchar("note", { length: 1000 }),

		createdAt: timestamp("created_at", { mode: "string" })
			.notNull()
			.defaultNow(),
	},
	(t) => [index("verification_log_verification_id_idx").on(t.verificationId)],
);

export const kycVerificationLogRelations = relations(
	kycVerificationLog,
	({ one }) => ({
		verification: one(userKycVerification, {
			fields: [kycVerificationLog.verificationId],
			references: [userKycVerification.id],
		}),
	}),
);

export default kycVerificationLog;
