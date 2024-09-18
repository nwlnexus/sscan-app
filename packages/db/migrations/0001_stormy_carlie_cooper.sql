CREATE TABLE IF NOT EXISTS "record" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid,
	"upc" varchar(12) NOT NULL,
	"real_count" integer NOT NULL,
	"reported_count" integer NOT NULL,
	"artist" varchar(255),
	"title" varchar(255),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "record" ADD CONSTRAINT "record_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
