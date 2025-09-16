"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { guests, users, accounts } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/lib/auth";
import { Argon2id } from "oslo/password";
import { redirect } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function signUp(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const parsedData = signupSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      error: parsedData.error.issues.map((e) => e.message).join(", "),
    };
  }

  const { name, email, password } = parsedData.data;
  const hashedPassword = await new Argon2id().hash(password);
  const userId = uuidv4();

  try {
    await db.insert(users).values({
      id: userId,
      name: name,
      email: email,
    });

    await db.insert(accounts).values({
      userId: userId,
      type: "credentials",
      provider: "credentials",
      providerAccountId: "credentials",
      password: hashedPassword,
    });

    await nextAuthSignIn("credentials", {
      email,
      password,
    });
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint failed")) {
      return {
        error: "User with this email already exists.",
      };
    }
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function signIn(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  // We can reuse the signupSchema for validation, or a subset of it
  const parsedData = signupSchema.pick({ email: true, password: true }).safeParse(rawData);

  if (!parsedData.success) {
    return {
      error: "Invalid email or password.",
    };
  }

  const { email, password } = parsedData.data;

  try {
    await nextAuthSignIn("credentials", {
      email,
      password,
    });
  } catch (error: any) {
    // NextAuth.js throws an error for failed sign-in attempts
    return {
      error: "Invalid email or password.",
    };
  }
}

export async function signOut() {
  await nextAuthSignOut({ redirectTo: "/sign-in" });
}

export async function createGuestSession() {
  const sessionToken = uuidv4();
  const sevenDays = 1000 * 60 * 60 * 24 * 7;
  const expiresAt = new Date(Date.now() + sevenDays);

  await db.insert(guests).values({
    sessionToken,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set("guest_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function guestSession() {
  const cookieStore = await cookies();
  const guestSession = cookieStore.get("guest_session");
  return guestSession;
}

export async function mergeGuestCartWithUserCart(userId: string) {
  const cookieStore = await cookies();
  const guestSessionToken = cookieStore.get("guest_session")?.value;
  if (!guestSessionToken) {
    return;
  }

  // Your logic to merge the cart here

  await db.delete(guests).where(eq(guests.sessionToken, guestSessionToken));
  cookieStore.delete("guest_session");
}
