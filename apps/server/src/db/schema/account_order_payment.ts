import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import accountOrder from "./account_order";
import payment from "./payment";

const accountOrderPayment = pgTable(
	"account_order_payments",
	{
		id: serial("id").primaryKey(),

		account_order_id: integer("account_order_id")
			.references(() => accountOrder.id, {
				onDelete: "cascade",
			})
			.notNull(),
		payment_id: integer("payment_id")
			.references(() => payment.id, {
				onDelete: "cascade",
			})
			.notNull(),

		created_at: timestamp("created_at", { mode: "string" })
			.notNull()
			.defaultNow(),
		updated_at: timestamp("updated_at", { mode: "string" })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		uniqueIndex("account_order_id_payment_id_idx").on(
			t.account_order_id,
			t.payment_id,
		),
	],
);

export const accountOrderPaymentRelations = relations(
	accountOrderPayment,
	({ one }) => ({
		accountOrder: one(accountOrder, {
			fields: [accountOrderPayment.account_order_id],
			references: [accountOrder.id],
		}),
		payment: one(payment, {
			fields: [accountOrderPayment.payment_id],
			references: [payment.id],
		}),
	}),
);

export default accountOrderPayment;
