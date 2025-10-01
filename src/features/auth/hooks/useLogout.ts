"use client";

import { useMutation } from "@tanstack/react-query";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useCurrentUserContext } from "../context/current-user-context";

export const useLogout = () => {
  const { refresh } = useCurrentUserContext();

  return useMutation({
    mutationFn: async () => {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      refresh();
    },
  });
};