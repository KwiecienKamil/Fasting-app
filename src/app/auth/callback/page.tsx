"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { setSession } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/stores/hooks";
import supabase from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (hasRedirected.current) return;

      if (event === "SIGNED_IN" && session) {
        hasRedirected.current = true;

        dispatch(setSession(session));

        router.replace("/");
      } else if (event === "INITIAL_SESSION" && !session) {
        hasRedirected.current = true;
        router.replace("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-3">
        <svg
          className="animate-spin mx-auto h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Autoryzacja i konfigurowanie sesji...
        </p>
      </div>
    </div>
  );
}
