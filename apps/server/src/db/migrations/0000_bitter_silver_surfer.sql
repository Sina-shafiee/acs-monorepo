CREATE TABLE "account_attributes" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"attribute_def_id" integer NOT NULL,
	"value" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account_listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"game_id" integer NOT NULL,
	"level" integer NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"status" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer,
	"buyer_id" text,
	"moderator_id" text,
	"status" integer NOT NULL,
	"total" numeric(12, 2) NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"fee" numeric(8, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account_order_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_order_id" integer NOT NULL,
	"payment_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"national_code" varchar(20),
	"kyc_level" integer DEFAULT 0 NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"phone_number_verified" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_national_code_unique" UNIQUE("national_code"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" text,
	"title" varchar(255),
	"status" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"role" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" integer NOT NULL,
	"sender_id" text NOT NULL,
	"replied_to_id" integer,
	"content_type" integer NOT NULL,
	"content" text,
	"sender_type" integer NOT NULL,
	"edited_at" timestamp,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"platform" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "games_title_unique" UNIQUE("title"),
	CONSTRAINT "games_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "game_attributes" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"attribute_label" varchar(255) NOT NULL,
	"attribute_type" integer NOT NULL,
	"is_required" boolean DEFAULT true,
	"display_order" integer DEFAULT -1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kyc_verification_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"verification_id" integer NOT NULL,
	"verification_method" integer NOT NULL,
	"request_payload" json,
	"response_payload" json,
	"status" integer NOT NULL,
	"note" varchar(1000),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" integer NOT NULL,
	"uuid" uuid NOT NULL,
	"provider" integer NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"paid_at" timestamp,
	"refunded_at" timestamp,
	"cancelled_at" timestamp,
	CONSTRAINT "payments_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "user_kyc_verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"level" integer NOT NULL,
	"status" integer NOT NULL,
	"verification_data" json,
	"document_url" varchar(1000),
	"verified_at" timestamp,
	"rejection_reason" varchar(1000),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_attributes" ADD CONSTRAINT "account_attributes_account_id_account_listings_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_attributes" ADD CONSTRAINT "account_attributes_attribute_def_id_game_attributes_id_fk" FOREIGN KEY ("attribute_def_id") REFERENCES "public"."game_attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_listings" ADD CONSTRAINT "account_listings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_listings" ADD CONSTRAINT "account_listings_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_orders" ADD CONSTRAINT "account_orders_account_id_account_listings_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_orders" ADD CONSTRAINT "account_orders_buyer_id_user_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_orders" ADD CONSTRAINT "account_orders_moderator_id_user_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_order_payments" ADD CONSTRAINT "account_order_payments_account_order_id_account_orders_id_fk" FOREIGN KEY ("account_order_id") REFERENCES "public"."account_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_order_payments" ADD CONSTRAINT "account_order_payments_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_message_replied_to_id_fk" FOREIGN KEY ("replied_to_id") REFERENCES "public"."chat_messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_attributes" ADD CONSTRAINT "game_attributes_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_verification_logs" ADD CONSTRAINT "kyc_verification_logs_verification_id_user_kyc_verifications_id_fk" FOREIGN KEY ("verification_id") REFERENCES "public"."user_kyc_verifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_kyc_verifications" ADD CONSTRAINT "user_kyc_verifications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "account_attribute_unique" ON "account_attributes" USING btree ("account_id","attribute_def_id");--> statement-breakpoint
CREATE INDEX "account_id_index" ON "account_attributes" USING btree ("account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "account_order_id_payment_id_idx" ON "account_order_payments" USING btree ("account_order_id","payment_id");--> statement-breakpoint
CREATE INDEX "verification_log_verification_id_idx" ON "kyc_verification_logs" USING btree ("verification_id");--> statement-breakpoint
CREATE INDEX "uuid" ON "payments" USING btree ("uuid");--> statement-breakpoint
CREATE INDEX "user_kyc_user_id_idx" ON "user_kyc_verifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_kyc_level_status_idx" ON "user_kyc_verifications" USING btree ("level","status");