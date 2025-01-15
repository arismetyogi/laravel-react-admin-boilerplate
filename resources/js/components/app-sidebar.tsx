"use client"

import * as React from "react"
import {
  Command,
  Frame, Home,
  LifeBuoy,
  Send, Settings2Icon, SettingsIcon,
  SquareTerminal,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavSecondary} from "@/components/nav-secondary"
import {NavUser} from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Link, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Managemen Karyawan",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Data Karyawan",
          url: "#",
        },
        {
          title: "Data Payroll",
          url: "#",
        },
      ],
    },
    {
      title: "Data BM",
      url: "#",
      icon: Frame,
    },
    {
      title: "System Settings",
      url: "#",
      icon: Settings2Icon,
      items: [
        {
          title: "Outlet",
          url: "#",
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: SettingsIcon,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const {auth} = usePage<PageProps>().props;

  return (
    <Sidebar variant="inset" collapsible={"icon"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route('dashboard')}>
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4"/>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">KF Apps</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}/>
        <NavSecondary items={data.navSecondary} className="mt-auto"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth.user}/>
      </SidebarFooter>
    </Sidebar>
  )
}
