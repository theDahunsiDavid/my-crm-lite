"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { LayoutDashboard, Users, FolderKanban, FileText } from "lucide-react";

function NavLink({
  href,
  icon: Icon,
  children,
  collapsed,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
        collapsed ? "justify-center px-0" : "px-4"
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span>{children}</span>}
    </Link>
  );
}

export function DashboardShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`z-10 fixed top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-gray-100 transition-all duration-300 ${
          collapsed ? "left-[52px]" : "left-[244px]"
        }`}
      >
        {collapsed ? "›" : "‹"}
      </button>
      <aside
        className={`fixed left-0 top-0 h-full ${
          collapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}
      >
        <div className={`p-6 ${collapsed ? "flex flex-col items-center" : ""}`}>
          {collapsed ? (
            <h1 className="text-2xl font-bold text-gray-800">CL</h1>
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">CRM-Lite</h1>
          )}
          <p
            className={`text-sm text-gray-500 mt-1 ${
              collapsed ? "invisible" : ""
            }`}
          >
            {userEmail}
          </p>
        </div>

        <nav className={`space-y-2 ${collapsed ? "px-2" : "px-4"}`}>
          <NavLink
            href="/dashboard"
            icon={LayoutDashboard}
            collapsed={collapsed}
          >
            Dashboard
          </NavLink>
          <NavLink href="/clients" icon={Users} collapsed={collapsed}>
            Clients
          </NavLink>
          <NavLink href="/projects" icon={FolderKanban} collapsed={collapsed}>
            Projects
          </NavLink>
          <NavLink href="/invoices" icon={FileText} collapsed={collapsed}>
            Invoices
          </NavLink>
        </nav>

        <div
          className={`absolute bottom-0 left-0 right-0 border-t border-gray-200 ${
            collapsed ? "p-2" : "p-4"
          }`}
        >
          <LogoutButton collapsed={collapsed} />
        </div>
      </aside>

      <main
        className={`${
          collapsed ? "ml-16" : "ml-64"
        } p-8 transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}
