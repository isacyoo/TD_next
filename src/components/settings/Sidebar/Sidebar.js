import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"

import { LuMousePointerClick, LuCalendar, LuKeyRound, LuCircleAlert, LuMapPin  } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";

export default function SettingsSidebar() {

    const items = [
        {
            title: "Account",
            url: "/settings/account",
            icon: MdAccountCircle,
        },
        {
            title: "Actions",
            url: "/settings/actions",
            icon: LuMousePointerClick,
        },
        {
            title: "Locations",
            url: "/settings/locations",
            icon: LuMapPin
        },
        {
            title: "Schedule",
            url: "/settings/schedule",
            icon: LuCalendar,
        },
        {
            title: "Members",
            url: "/settings/members",
            icon: LuCircleAlert ,
        },
        {
            title: "API Key",
            url: "/settings/api",
            icon: LuKeyRound ,
        }
      ]
    return (
        <Sidebar variant="floating">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Manage</SidebarGroupLabel>
                    <SidebarGroupContent>  
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Link href={item.url} className="flex items-center">
                                        <item.icon className="mr-2" />
                                        {item.title}
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}