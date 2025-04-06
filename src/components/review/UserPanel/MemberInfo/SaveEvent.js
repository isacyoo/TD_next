"use client"

import { useState } from "react"
import { clientFetch } from "@/util/clientApi"
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

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
        <div className="relative group">
            <Button sizes="icon" variant="link" onClick={updateSaveStatus}>
                {button}
            </Button>
            <span className="absolute bottom-6 left-4 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hoverMessage}</span>
        </div>
    )
}