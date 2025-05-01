"use client"
import { useState } from "react"

import LocationNameChange from "./LocationNameChange"
import Compliance from "@/components/settings/Location/Compliance"
import LocationScheduleLink from "./LocationScheduleLink"
import LocationHighRisk from "./LocationHighRisk"
import { Button } from "@/components/ui/button"
import { clientFetch } from "@/util/clientApi"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LocationSetting({ location, locationNames }) {
    const [ name, setName ] = useState(location.name)
    const [ videoRetentionDays, setVideoRetentionDays ] = useState(location.video_retention_days)
    const [ streamRetentionHours, setStreamRetentionHours ] = useState(location.stream_retention_hours)
    const [ reviewHighRiskMembers, setReviewHighRiskMembers ] = useState(location.review_high_risk_members)
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if (videoRetentionDays < 0 || videoRetentionDays > 365) {
            toast.warning("Video retention days must be between 0 and 365")
            return
        }
        if (streamRetentionHours < 0 || streamRetentionHours > 720) {
            toast.warning("Stream retention hours must be between 0 and 720")
            return
        }
        if (name === "") {
            toast.warning("Location name cannot be empty")
            return
        }
        if (locationNames.includes(name) && name !== location.name) {
            toast.warning("Location name already exists")
            return
        }
        const body = {
            name,
            video_retention_days: videoRetentionDays !== "" ? videoRetentionDays : null,
            stream_retention_hours: streamRetentionHours !== "" ? streamRetentionHours : null,
            review_high_risk_members: reviewHighRiskMembers
        }

        const res = await clientFetch("PUT", `/location-settings/${location.id}`, body, setLoading)
        if (res.ok) {
            toast.success("Location settings updated successfully")
            router.refresh()
        } else {
            toast.error("Failed to update location settings")
        }
    }


    return (
        <>
            <LocationNameChange
                name={name}
                setName={setName}
            />
            <br />
            <Compliance
                videoRetention={videoRetentionDays}
                streamRetention={streamRetentionHours}
                setVideoRetention={setVideoRetentionDays}
                setStreamRetention={setStreamRetentionHours}
            />
            <br />
            <LocationScheduleLink locationId={location.id} />
            <br />
            <LocationHighRisk isEnabled={reviewHighRiskMembers} setIsEnabled={setReviewHighRiskMembers} />
            <div className="flex justify-end mb-4">
                <Button onClick={handleSubmit} disabled={loading}>Save</Button>
            </div>
        </>
    )

}