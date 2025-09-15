import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as schema from "@/lib/db/schema";

dotenv.config({
  path: '.env.local',
});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
