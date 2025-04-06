"use client"
import { useState } from "react"
import { post, del } from "@/util/clientApi"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";


export default function ModifyHighRisk({ memberId, highRisk }) {
    const [ isHighRisk, setIsHighRisk ] = useState(highRisk)

    const addHighRisk = async () => {
        const res = await post(`/high_risk_member/${memberId}`)
        if (res.ok) {
            setIsHighRisk(true)
            toast.success("Added high risk member")
        } else {
            toast.error("Failed to add high risk member")
        }
    }
    const removeHighRisk = async () => {
        const res = await del(`/high_risk_member/${memberId}`)
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
        <div className="relative group">
            <Button sizes="icon" variant="link" onClick={handleClick}>
                {text}
            </Button>
            <span className="absolute bottom-6 left-4 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hoverMessage}</span>
        </div>
    )
}