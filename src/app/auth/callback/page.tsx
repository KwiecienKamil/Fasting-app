"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setSession } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/stores/hooks";
import supabase from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.replace("/login");
        return;
      }

      dispatch(setSession(data.session));

      router.replace("/");
    };

    handleCallback();
  }, [dispatch, router]);

  return <p>Potwierdzanie konta...</p>;
}
