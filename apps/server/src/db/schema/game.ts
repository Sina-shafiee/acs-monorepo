import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import accountListing from "./account_listing";
import gameAttribute from "./game_attribute";

const game = pgTable("games", {
	id: serial("id").primaryKey(),

	title: varchar("title", { length: 100 }).unique().notNull(),
	slug: varchar("slug", { length: 100 }).unique().notNull(),

	platform: integer("platform").notNull(),

	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const gameRelations = relations(game, ({ many }) => ({
	gameAttributes: many(gameAttribute),
	accountListings: many(accountListing),
}));

export default game;
