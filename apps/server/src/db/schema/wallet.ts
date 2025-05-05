import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const wallet = pgTable("wallet", {
	id: serial("id").primaryKey(),

	userId: text("user_id")
		.references(() => user.id, { onDelete: "cascade" })
		.notNull()
		.unique(),

	balance: text("balance").notNull(),
	iv: text("iv").notNull(),

	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const walletRelations = relations(wallet, ({ one }) => ({
	user: one(user, {
		fields: [wallet.userId],
		references: [user.id],
	}),
}));

export default wallet;
