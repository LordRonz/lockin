CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid NOT NULL,
	"full_name" text,
	"email" text NOT NULL,
	"phone" text,
	"location" text
);
--> statement-breakpoint
CREATE TABLE "summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "template_id" DROP NOT NULL;