import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"

import { LuMousePointerClick, LuCalendar, LuKeyRound, LuCircleAlert, LuMapPin  } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";

export default function SettingsSidebar() {

    const items = [
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
            title: "API Key",
            url: "/settings/api",
            icon: LuKeyRound ,
        },
        {
            title: "Members",
            url: "/settings/members",
            icon: LuCircleAlert ,
        },
        {
            title: "Compliance",
            url: "/settings/compliance",
            icon: CgFileDocument,
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