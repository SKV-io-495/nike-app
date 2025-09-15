"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { guests, users, accounts } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { lucia } from "@/lib/auth";
import { Argon2id } from "oslo/password";
import { redirect } from "next/navigation";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(values: z.infer<typeof signupSchema>) {
  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = uuidv4();

  try {
    await db.insert(users).values({
      id: userId,
      email: values.email,
    });

    await db.insert(accounts).values({
      userId,
      providerId: "credentials",
      accountId: values.email,
      password: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
      data: { userId },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
}

export async function signIn(values: z.infer<typeof signupSchema>) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: (table) => eq(table.email, values.email),
    });

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    const existingAccount = await db.query.accounts.findFirst({
      where: (table) => eq(table.userId, existingUser.id),
    });

    if (!existingAccount || !existingAccount.password) {
      return {
        error: "Invalid credentials",
      };
    }

    const isValidPassword = await new Argon2id().verify(
      existingAccount.password,
      values.password
    );

    if (!isValidPassword) {
      return {
        error: "Invalid credentials",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
}

export async function signOut() {
  const sessionCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/sign-in");
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
