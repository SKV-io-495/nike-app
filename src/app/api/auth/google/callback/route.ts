import { google } from "@/lib/auth/providers";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { db } from "@/db";
import { users, accounts } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

