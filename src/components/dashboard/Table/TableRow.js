"use client"

import Link from 'next/link'
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useState } from 'react'
import { CiMedicalClipboard } from "react-icons/ci";
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

export default function DashboardTableRow({ event, i, history, params, fav }) {
    const [hoverMessage, setHoverMessage] = useState("Click to copy the event id to clipboard")
    const handleCopy = async () => {
        await navigator.clipboard.writeText(event.id)
        setHoverMessage("Copied!")
        setTimeout(() => {
            setHoverMessage("Click to copy the event id to clipboard")
        }, 2000)
    }

    const allMemberIds = event.entries.map(entry => entry.member_id).join(', ')
    return (
        <TableRow>
            <TableCell key={event.id + 'link' + i} className='hover:underline'>
                <div className="flex items-center gap-6">
                    <Link href={`/review-event/${event.id}${fav ? "?showAdjacentEvents=false&" : "?"}${params}`}>
                        Start reviewing
                    </Link>
                    <HoverCard openDelay={0} closeDelay={0}>
                        <HoverCardTrigger asChild>
                            <Button size="icon" variant="link" className="h-4" onClick={handleCopy}>
                                <CiMedicalClipboard />
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {hoverMessage}
                        </HoverCardContent>
                    </HoverCard>
                    </div>
            </TableCell>
            <TableCell key={event.id + 'time' + i}>{event.entered_at}</TableCell>
            <TableCell key={event.id + 'id' + i}>{allMemberIds}</TableCell>
            {history && <TableCell key={event.id + 'action' + i}>{event.action.name}</TableCell>}
        </TableRow>
        )
}