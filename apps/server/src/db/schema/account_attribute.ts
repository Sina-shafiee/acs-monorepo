import { relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import accountListing from "./account_listing";
import gameAttribute from "./game_attribute";

const accountAttribute = pgTable(
	"account_attributes",
	{
		id: serial("id").primaryKey(),

		accountId: integer("account_id")
			.references(() => accountListing.id, {
				onDelete: "cascade",
			})
			.notNull(),
		attributeDefId: integer("attribute_def_id")
			.references(() => gameAttribute.id, {
				onDelete: "cascade",
			})
			.notNull(),

		value: text("value"),

		createdAt: timestamp("created_at", { mode: "string" })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		uniqueIndex("account_attribute_unique").on(t.accountId, t.attributeDefId),
		index("account_id_index").on(t.accountId),
	],
);

export const accountAttributeRelations = relations(
	accountAttribute,
	({ one }) => ({
		account: one(accountListing, {
			fields: [accountAttribute.accountId],
			references: [accountListing.id],
		}),
		attributeDef: one(gameAttribute, {
			fields: [accountAttribute.attributeDefId],
			references: [gameAttribute.id],
		}),
	}),
);

export default accountAttribute;
