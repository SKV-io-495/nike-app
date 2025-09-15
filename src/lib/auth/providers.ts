import { Google, Apple } from "arctic";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.NEXT_PUBLIC_URL + "/api/auth/google/callback"
);

export const apple = new Apple(
  process.env.APPLE_CLIENT_ID!,
  process.env.APPLE_TEAM_ID!,
  process.env.APPLE_KEY_ID!,
  Buffer.from(process.env.APPLE_PRIVATE_KEY!, "utf-8"),
  process.env.NEXT_PUBLIC_URL + "/api/auth/apple/callback"
);
