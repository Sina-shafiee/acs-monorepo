import { relations } from "drizzle-orm";
import {
	decimal,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import accountAttribute from "./account_attribute";
import accountOrder from "./account_order";
import game from "./game";
import { user } from "./auth";

const accountListing = pgTable("account_listings", {
	id: serial("id").primaryKey(),

	sellerId: text("user_id")
		.references(() => user.id, {
			onDelete: "cascade",
		})
		.notNull(),
	gameId: integer("game_id")
		.references(() => game.id, {
			onDelete: "cascade",
		})
		.notNull(),

	level: integer("level").notNull(),
	price: decimal("price", { precision: 12, scale: 2 }).notNull(),
	status: integer("status").notNull(),

	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const accountListingRelations = relations(
	accountListing,
	({ one, many }) => ({
		seller: one(user, {
			fields: [accountListing.sellerId],
			references: [user.id],
		}),
		game: one(game, {
			fields: [accountListing.gameId],
			references: [game.id],
		}),
		accountAttributes: many(accountAttribute),
		accountOrders: many(accountOrder),
	}),
);

export default accountListing;
