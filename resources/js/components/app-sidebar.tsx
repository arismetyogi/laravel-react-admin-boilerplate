"use client"

import * as React from "react"
import {
  Command,
  Frame,
  Home,
  LifeBuoy,
  MilestoneIcon,
  Send,
  Settings2Icon,
  UserIcon,
  Users2Icon,
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
import {NavMainUser} from "@/components/nav-main-user";
import {can} from "@/helper";
import {NavMainSetting} from "@/components/nav-main-setting";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Employee Management",
      url: "#",
      icon: MilestoneIcon,
      isActive: true,
      items: [
        {
          title: "Employee Data",
          url: "#",
        },
        {
          title: "Payrolls",
          url: "#",
        },
      ],
    },
  ],
  navSetting:[
    {
      title: "System Settings",
      url: "#",
      icon: Settings2Icon,
      items: [
        {
          title: "Departments",
          url: "#",
          icon: Frame,
        },
        {
          title: "Units",
          url: "#",
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
  navUser: [

    {
      title: "User Management",
      url: "#",
      icon: Users2Icon,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/users",
        },
      ],
    },
  ],
  profile: [
    {
      title: "Profile",
      url: "/profile",
      icon: UserIcon
    },
  ]
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
        {can(auth.user, 'manage-departments') && (
          <NavMainSetting items={data.navSetting}/>
        )}
        {can(auth.user, 'manage-users') && (
          <NavMainUser items={data.navUser}/>
        )}
        <NavSecondary items={data.profile}/>
        <NavSecondary items={data.navSecondary} className="mt-auto"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth.user}/>
      </SidebarFooter>
    </Sidebar>
  )
}
