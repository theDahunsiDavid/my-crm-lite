import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">CRM-Lite</h1>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>

        <nav className="px-4 space-y-2">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/clients">Clients</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/invoices">Invoices</NavLink>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
