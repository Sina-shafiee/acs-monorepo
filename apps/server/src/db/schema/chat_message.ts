import { relations } from "drizzle-orm";
import {
	type AnyPgColumn,
	foreignKey,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import chat from "./chat";
import { user } from "./auth";

export const chatMessage = pgTable(
	"chat_messages",
	{
		id: serial("id").primaryKey(),

		chatId: integer("chat_id")
			.references(() => chat.id, {
				onDelete: "cascade",
			})
			.notNull(),
		senderId: text("sender_id")
			.references(() => user.id, {
				onDelete: "cascade",
			})
			.notNull(),
		repliedToId: integer("replied_to_id"),

		contentType: integer("content_type").notNull(),
		content: text("content"),
		senderType: integer("sender_type").notNull(),

		editedAt: timestamp("edited_at", { mode: "string" }),

		deletedAt: timestamp("deleted_at", { mode: "string" }),
		createdAt: timestamp("created_at", { mode: "string" })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		foreignKey({
			columns: [t.repliedToId],
			foreignColumns: [t.id],
			name: "chat_message_replied_to_id_fk",
		}),
	],
);

export const chatMessageRelations = relations(chatMessage, ({ one }) => ({
	chat: one(chat, {
		fields: [chatMessage.chatId],
		references: [chat.id],
	}),
	sender: one(user, {
		fields: [chatMessage.senderId],
		references: [user.id],
	}),
	repliedTo: one(chatMessage, {
		fields: [chatMessage.repliedToId],
		references: [chatMessage.id],
	}),
}));

export default chatMessage;
