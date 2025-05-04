import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import accountAttribute from "./account_attribute";
import game from "./game";

const gameAttribute = pgTable("game_attributes", {
	id: serial("id").primaryKey(),

	gameId: integer("game_id")
		.references(() => game.id, {
			onDelete: "cascade",
		})
		.notNull(),

	attributeLabel: varchar("attribute_label", { length: 255 }).notNull(),
	attributeType: integer("attribute_type").notNull(),
	isRequired: boolean("is_required").default(true),
	displayOrder: integer("display_order").default(-1),

	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const gameAttributeRelations = relations(
	gameAttribute,
	({ one, many }) => ({
		game: one(game, {
			fields: [gameAttribute.gameId],
			references: [game.id],
		}),

		accountAttributes: many(accountAttribute),
	}),
);

export default gameAttribute;
