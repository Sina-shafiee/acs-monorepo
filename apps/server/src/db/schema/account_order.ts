import { relations } from "drizzle-orm";
import {
	decimal,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import accountListing from "./account_listing";
import accountOrderPayment from "./account_order_payment";
import { user } from "./auth";

const accountOrder = pgTable("account_orders", {
	id: serial("id").primaryKey(),

	accountId: integer("account_id").references(() => accountListing.id, {
		onDelete: "cascade",
	}),
	buyerId: text("buyer_id").references(() => user.id, {
		onDelete: "cascade",
	}),
	moderatorId: text("moderator_id").references(() => user.id, {
		onDelete: "cascade",
	}),

	status: integer("status").notNull(),
	total: decimal("total", { precision: 12, scale: 2 }).notNull(),
	price: decimal("price", { precision: 12, scale: 2 }).notNull(),
	fee: decimal("fee", { precision: 8, scale: 2 }).notNull(),

	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const accountOrderRelations = relations(
	accountOrder,
	({ one, many }) => ({
		account: one(accountListing, {
			fields: [accountOrder.accountId],
			references: [accountListing.id],
		}),
		buyer: one(user, {
			fields: [accountOrder.buyerId],
			references: [user.id],
			relationName: "account_order_buyer",
		}),
		moderator: one(user, {
			fields: [accountOrder.moderatorId],
			references: [user.id],
			relationName: "account_order_moderator",
		}),
		payments: many(accountOrderPayment),
	}),
);

export default accountOrder;
