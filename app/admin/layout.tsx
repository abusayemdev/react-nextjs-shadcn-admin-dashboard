// app/admin/layout.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import SidebarStateProvider from "@/components/provider/SidebarStateProvider";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<div className="flex min-h-screen w-full" />}>
        <AuthenticatedAdmin>{children}</AuthenticatedAdmin>
      </Suspense>
    </ThemeProvider>
  );
}

async function AuthenticatedAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <SidebarStateProvider>
      <AppSidebar />

      <main className="flex-1 min-w-0">
        <Navbar />
        <div className="p-4">{children}</div>
      </main>
    </SidebarStateProvider>
  );
}