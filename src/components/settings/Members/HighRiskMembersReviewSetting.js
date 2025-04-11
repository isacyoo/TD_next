"use client"

import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { clientFetch } from "@/util/clientApi"

export default function HighRiskMembersReviewSetting({ reviewHighRiskMembers }) {
    const [ isEnabled, setIsEnabled ] = useState(reviewHighRiskMembers)

    const handleSave = async () => {
        const res = await clientFetch('PUT', '/user-settings', { review_high_risk_members: isEnabled })
        if (res.ok) {
            toast.success('Settings saved')
        }
        else {
            toast.error("Failed to save settings")
        }
    }
    return (
        <div>
            <div className="flex items-center mb-4">
                <span className="mr-4">Always review high-risk members</span>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled}/>
            </div>
            <Button onClick={handleSave}>Save</Button>
        </div>
    )
}