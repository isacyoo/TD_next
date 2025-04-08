"use client"

import { useState } from "react"
import { clientFetch } from "@/util/clientApi"
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

export default function SaveEvent({ eventId, saved }) {
    const [ currentSaved, setCurrentSaved ] = useState(saved)
    const button = currentSaved ? <FaStar /> : <FaRegStar />
    const hoverMessage = currentSaved ? "Unsave event" : "Save event"
    const updateSaveStatus = async () => {
        const res = await clientFetch('PUT', `/event_save_status/${eventId}`, { save: !currentSaved })
        if (res.ok) {
            setCurrentSaved(!currentSaved)
            toast.success(currentSaved ? "Removed from saved events" : "Added to saved events")
        } else {
            toast.error("Failed to save event")
        }
    }

    return (
        <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
                <Button sizes="icon" variant="link" onClick={updateSaveStatus}>
                    {button}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent side="top">
                <span className="text-xs">{hoverMessage}</span>
            </HoverCardContent>
        </HoverCard>
    )
}