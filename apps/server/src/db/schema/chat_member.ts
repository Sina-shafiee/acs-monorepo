import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import chat from "./chat";
import { user } from "./auth";

export const chatMember = pgTable("chat_members", {
	id: serial("id").primaryKey(),

	chatId: integer("chat_id")
		.references(() => chat.id, {
			onDelete: "cascade",
		})
		.notNull(),
	userId: text("user_id")
		.references(() => user.id, {
			onDelete: "cascade",
		})
		.notNull(),

	role: integer("role").notNull(),

	joinedAt: timestamp("joined_at", { mode: "string" }).notNull().defaultNow(),
});

export const chatMemberRelations = relations(chatMember, ({ one }) => ({
	chat: one(chat, {
		fields: [chatMember.chatId],
		references: [chat.id],
	}),
	user: one(user, {
		fields: [chatMember.userId],
		references: [user.id],
	}),
}));

export default chatMember;
