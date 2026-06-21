"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { registerWithEmail } from "@/features/auth/authSlice";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, registrationSuccess, session } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerWithEmail({ email: email.trim(), password }));
  };

  if (registrationSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
        <div className="w-full max-w-md text-center space-y-4 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Potwierdź email
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Wysłaliśmy link aktywacyjny na <b>{email}</b>.
            <br />
            Kliknij w link, aby dokończyć rejestrację.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Wróć do logowania
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Witamy!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Zarejestruj się, aby utworzyć konto
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-950/30 dark:border-red-900">
            <div className="text-sm text-red-700 dark:text-red-400 font-medium">
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Hasło
              </label>
              <input
                id="password"
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 disabled:bg-blue-400 dark:disabled:bg-blue-700 disabled:cursor-not-allowed"
            >
              {loading ? "Rejestracja..." : "Zarejestruj się"}
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-800">
              Lub
            </span>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Masz już konto?
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
}
