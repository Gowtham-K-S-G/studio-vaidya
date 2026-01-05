
"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Pill,
  Calendar,
  FileText,
  Bot,
} from "lucide-react";
import { Logo } from "@/components/icons";
import { useFirebase } from "@/firebase";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/symptom-checker", icon: Bot, label: "AI Assistant" },
  { href: "/appointments", icon: Calendar, label: "Appointments" },
  { href: "/medication", icon: Pill, label: "Medication" },
  { href: "/health-records", icon: FileText, label: "Health Records" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();

  React.useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo className="size-8 text-primary" />
              <span className="text-lg font-semibold">VAIDYA</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             {/* Can add user profile or settings here */}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
  );
}
