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
      {isSignUp ? (
        // Nike Sign Up Design
        <>
          <div className="text-right mb-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/sign-in" className="text-black font-medium underline">
              Sign In
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-2">
              Join Nike Today!
            </h1>
            <p className="text-gray-600 text-sm">
              Create your account to start your fitness journey.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <SocialProviders />
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">Or sign up with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-black mb-2"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="johndoe@gmail.com"
              />
            </div>
            
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors mt-6"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-xs text-gray-500 mt-4">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline">Privacy Policy</Link>
          </div>
        </>
      ) : (
        // Orion Sign In Design
        <>
          <div className="text-right mb-4">
            <span className="text-gray-600 text-sm">Don't have an account? </span>
            <Link href="/sign-up" className="text-black font-medium underline">
              Sign Up
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-2">
              Welcome back to Orion!
            </h1>
            <p className="text-gray-600 text-sm">
              Please enter your details to sign in your account
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <SocialProviders />
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">Or sign in with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="johndoe@gmail.com"
              />
            </div>
            
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="minimum 8 character"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors mt-6"
            >
              Sign In →
            </button>

            <div className="text-center mt-4">
              <Link href="#" className="text-black underline text-sm font-medium">
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="text-center text-xs text-gray-500 mt-8 flex justify-between">
            <span>© 2024 Orion</span>
            <div className="space-x-4">
              <Link href="#" className="hover:text-gray-700">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-700">Support</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}