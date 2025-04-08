"use client"

import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { clientFetch } from "@/util/clientApi"
import HighRiskLink from "./HighRiskLink"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"

export default function LocationHighRisk({ reviewHighRiskMembers }) {
    const [ isEnabled, setIsEnabled ] = useState(reviewHighRiskMembers)

    const handleSave = async () => {
        const res = await clientFetch('PUT', '/user_settings', { review_high_risk_members: isEnabled })
        if (res.ok) {
            toast.success('Settings saved')
        }
        else {
            toast.error("Failed to save settings")
        }
    }
    return (
        <div>
            <SettingsH2>High-risk members</SettingsH2>
            <div className="flex items-center my-4">
                <span className="mr-4">Always review high-risk members</span>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled}/>
            </div>
            <div className="flex justify-between items-center">
                <Button onClick={handleSave}>Save</Button>
                <HighRiskLink />
            </div>
        </div>
    )
}