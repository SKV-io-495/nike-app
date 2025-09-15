"use client";

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
