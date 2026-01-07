import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Welcome, {user.email}!</p>
        <p className="text-sm text-gray-500 mt-2">
          This is your dashboard. Widgets and charts will go here.
        </p>
      </div>
    </div>
  );
}
