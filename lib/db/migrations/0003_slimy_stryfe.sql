CREATE TABLE IF NOT EXISTS "Order" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"tradingPairId" uuid NOT NULL,
	"side" "char" NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Trading" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"baseCurrency" varchar NOT NULL,
	CONSTRAINT "Trading_baseCurrency_unique" UNIQUE("baseCurrency")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
