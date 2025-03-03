ALTER TABLE "contacts" ADD CONSTRAINT "contacts_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summary" ADD CONSTRAINT "summary_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_resume_id_unique" UNIQUE("resume_id");--> statement-breakpoint
ALTER TABLE "summary" ADD CONSTRAINT "summary_resume_id_unique" UNIQUE("resume_id");