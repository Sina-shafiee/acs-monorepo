import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import accountListing from "./account_listing";
import accountOrder from "./account_order";
import userKycVerification from "./user_kyc_verification";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	image: text("image"),

	nationalCode: varchar("national_code", { length: 20 }).unique(),
	kycLevel: integer("kyc_level").default(0).notNull(),

	email: varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),

	phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
	phoneNumberVerified: boolean("phone_number_verified").notNull(),

	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", {
		mode: "string",
	}),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
		mode: "string",
	}),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	kycVerifications: many(userKycVerification),
	accountOrdersAsBuyer: many(accountOrder, {
		relationName: "account_order_buyer",
	}),
	accountOrdersAsModerator: many(accountOrder, {
		relationName: "account_order_moderator",
	}),
	accountListings: many(accountListing),
	userAccounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
		relationName: "user_accounts",
	}),
}));
