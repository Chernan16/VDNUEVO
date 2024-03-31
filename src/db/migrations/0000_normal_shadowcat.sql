DO $$ BEGIN
 CREATE TYPE "statusEnum" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"price" numeric NOT NULL,
	"status" "statusEnum" DEFAULT 'active',
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"total" numeric NOT NULL,
	"status" "statusEnum" DEFAULT 'active',
	"create_at" timestamp DEFAULT now(),
	"update_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales_datails" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"quantity" integer NOT NULL,
	"status" "statusEnum" DEFAULT 'active',
	"create_at" timestamp DEFAULT now(),
	"update_at" timestamp DEFAULT now(),
	"sales_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sales_datails" ADD CONSTRAINT "sales_datails_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sales_datails" ADD CONSTRAINT "sales_datails_sales_id_sales_id_fk" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
