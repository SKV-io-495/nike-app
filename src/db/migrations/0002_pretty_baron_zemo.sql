-- Drop foreign key constraints
ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS "accounts_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT IF EXISTS "sessions_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "passwords" DROP CONSTRAINT IF EXISTS "passwords_userId_users_id_fk";
--> statement-breakpoint

-- Alter column types
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;
--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "userId" SET DATA TYPE text;
--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "userId" SET DATA TYPE text;
--> statement-breakpoint
ALTER TABLE "passwords" ALTER COLUMN "userId" SET DATA TYPE text;
--> statement-breakpoint

-- Re-create foreign key constraints
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
