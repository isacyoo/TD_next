import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import Link from "next/link"

export default function DashboardDropdown({ locations }) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>Dashboard</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {locations.map((location) => (
                <DropdownMenuItem key={location.id}>
                    <Link href={`/${location.id}/dashboard/1`}>{location.name}</Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>

    )
}