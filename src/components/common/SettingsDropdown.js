import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import Link from "next/link"

export default function SettingsDropdown() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>Settings</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/settings/account">Account</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/settings/actions">Actions</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/settings/locations">Locations</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/settings/schedule">Schedule</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/settings/members">Members</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/settings/api">API Key</Link></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    )
}