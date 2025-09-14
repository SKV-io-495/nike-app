"use client";

import { useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isSignUp = mode === "signup";

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {isSignUp ? "Join Nike Today!" : "Welcome back!"}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp
            ? "Create your account to start your fitness journey."
            : "Please enter your details to sign in."}
        </p>
      </div>

      <div className="space-y-4">
        <SocialProviders />
        <div className="flex items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="mx-4 text-muted-foreground">Or sign in with</span>
          <div className="flex-grow border-t border-border"></div>
        </div>
      </div>

      <form className="space-y-4">
        {isSignUp && (
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-foreground"
            >
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="minimum 8 characters"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <div className="text-center text-sm">
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
