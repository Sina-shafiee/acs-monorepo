import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import chatMember from "./chat_member";
import chatMessage from "./chat_message";
import { user } from "./auth";

export const chat = pgTable("chats", {
	id: serial("id").primaryKey(),
	creatorId: text("creator_id").references(() => user.id, {
		onDelete: "cascade",
	}),
	title: varchar("title", { length: 255 }),
	status: integer("status").notNull(),
});

export const chatRelations = relations(chat, ({ one, many }) => ({
	creator: one(user, {
		fields: [chat.creatorId],
		references: [user.id],
	}),
	members: many(chatMember),
	chatMessages: many(chatMessage),
}));

export default chat;
