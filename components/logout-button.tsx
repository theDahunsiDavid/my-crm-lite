"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg"
    >
      Logout
    </button>
  );
}
