"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full flex items-center gap-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg ${
        collapsed ? "justify-center px-0" : "px-4"
      }`}
    >
      <LogOut className="w-5 h-5 shrink-0" />
      {!collapsed && <span>Logout</span>}
    </button>
  );
}
