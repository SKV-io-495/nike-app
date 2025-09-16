import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import * as schema from "@/lib/db/schema/index";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db,{
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const existingUser = await db.query.users.findFirst({
            where: (table) => eq(table.email, email),
          });

          if (!existingUser) {
            return null;
          }

          const existingAccount = await db.query.accounts.findFirst({
            where: (table) =>
              eq(table.userId, existingUser.id) &&
              eq(table.provider, "credentials"),
          });

          if (!existingAccount || !existingAccount.password) {
            return null;
          }

          const isValidPassword = await new Argon2id().verify(
            existingAccount.password,
            password
          );

          if (!isValidPassword) {
            return null;
          }

          return existingUser;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
