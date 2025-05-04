import { relations } from "drizzle-orm";
import {
	index,
	integer,
	json,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

const userKycVerification = pgTable(
	"user_kyc_verifications",
	{
		id: serial("id").primaryKey(),

		userId: text("user_id")
			.references(() => user.id, { onDelete: "cascade" })
			.notNull(),

		level: integer("level").notNull(),
		status: integer("status").notNull().notNull(),
		verificationData: json("verification_data"),
		documentUrl: varchar("document_url", { length: 1000 }),
		verifiedAt: timestamp("verified_at", { mode: "string" }),
		rejectionReason: varchar("rejection_reason", { length: 1000 }),
		createdAt: timestamp("created_at", { mode: "string" })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		index("user_kyc_user_id_idx").on(t.userId),
		index("user_kyc_level_status_idx").on(t.level, t.status),
	],
);

export const userKycVerificationRelations = relations(
	userKycVerification,
	({ one }) => ({
		user: one(user, {
			fields: [userKycVerification.userId],
			references: [user.id],
		}),
	}),
);

export default userKycVerification;
