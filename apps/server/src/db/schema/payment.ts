import { relations } from "drizzle-orm";
import {
	decimal,
	index,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import accountOrderPayment from "./account_order_payment";
import { user } from "./auth";

const payment = pgTable(
	"payments",
	{
		id: serial("id").primaryKey(),

		user_id: text("user_id")
			.references(() => user.id, {
				onDelete: "cascade",
			})
			.notNull(),

		status: integer("status").notNull(),

		uuid: uuid("uuid").unique().notNull(),
		provider: integer("provider").notNull(),
		amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),

		paid_at: timestamp("paid_at", { mode: "string" }),
		refunded_at: timestamp("refunded_at", { mode: "string" }),
		cancelled_at: timestamp("cancelled_at", { mode: "string" }),
	},
	(t) => [index("uuid").on(t.uuid)],
);

export const paymentRelations = relations(payment, ({ one, many }) => ({
	user: one(user, {
		fields: [payment.user_id],
		references: [user.id],
	}),
	accountOrderPayments: many(accountOrderPayment),
}));

export default payment;
