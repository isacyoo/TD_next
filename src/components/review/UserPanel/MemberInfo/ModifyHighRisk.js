"use client"
import { useState } from "react"
import { clientFetch } from "@/util/clientApi"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"


export default function ModifyHighRisk({ memberId, highRisk }) {
    const [ isHighRisk, setIsHighRisk ] = useState(highRisk)

    const addHighRisk = async () => {
        const res = await clientFetch('POST', `/high-risk-member/${memberId}`)
        if (res.ok) {
            setIsHighRisk(true)
            toast.success("Added high risk member")
        } else {
            toast.error("Failed to add high risk member")
        }
    }
    const removeHighRisk = async () => {
        const res = await clientFetch('DELETE', `/high-risk-member/${memberId}`)
        if (res.ok) {
            setIsHighRisk(false)
            toast.success("Removed high risk member")
        } else {
            toast.error("Failed to remove high risk member")
        }
    }
    const handleClick = async () => {
        if (isHighRisk) {
            await removeHighRisk()
        } else {
            await addHighRisk()
        }
    }
    const text = isHighRisk ? <LuCircleMinus />  : <LuCirclePlus />
    const hoverMessage = isHighRisk ? "Remove from high risk" : "Add to high risk"
    return (
        <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
                <Button sizes="icon" variant="link" onClick={handleClick}>
                    {text}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent side="top">
                <span className="text-xs">{hoverMessage}</span>
            </HoverCardContent>
        </HoverCard>
    )
}