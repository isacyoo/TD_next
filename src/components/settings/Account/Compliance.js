"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { clientFetch } from "@/util/clientApi"
import { toast } from "sonner"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"

export default function Compliance({ videoRetentionDays, streamRetentionHours }) {
    if ( videoRetentionDays === null ) {
        videoRetentionDays = ""
    }
    if ( streamRetentionHours === null ) {
        streamRetentionHours = ""
    }
    const [ videoRetention, setVideoRetention ] = useState(videoRetentionDays)
    const [ streamRetention, setStreamRetention ] = useState(streamRetentionHours)
    const [ loading, setLoading ] = useState(false)

    const isNumeric = (string) => /^[0-9]+$/.test(string)

    const handleVideoRetentionChange = (e) => {
        const value = e.target.value

        if (value === "") {
            setVideoRetention(value)
            return
        }

        if (isNumeric(value)) {
            const intValue = parseInt(value, 10)
            if (intValue >=0 && intValue <= 365) {
                setVideoRetention(intValue)
            }
        }
    }
    const handleStreamRetentionChange = (e) => {
        const value = e.target.value

        if (value === "") {
            setStreamRetention(value)
            return
        }
        if (isNumeric(value)) {
            const intValue = parseInt(value, 10)
            if (intValue >=0 && intValue <= 720) {
                setStreamRetention(intValue)
            }
        }
    }

    const handleSubmit = async () => {
        if (videoRetention < 0 || videoRetention > 365) {
            toast.warning("Video retention days must be between 0 and 365")
            return
        }

        if (streamRetention < 0 || streamRetention > 720) {
            toast.warning("Stream retention hours must be between 0 and 720")
            return
        }
        
        const res = await clientFetch("PUT", "/user-settings", {
            video_retention_days: videoRetention,
            stream_retention_hours: streamRetention
        }, setLoading)
        if (res.ok) {
            toast.success("Account settings updated successfully")
        } else {
            toast.error("Failed to update account settings. Please try again.")
        }
    }

    return (
        <div>
            <SettingsH2 mb={4}>Compliance</SettingsH2>
            <Label htmlFor="video-retention" className="block mb-2">
                Video Retention Days
            </Label>
            <Input
                id="video-retention"
                value={videoRetention}
                onChange={handleVideoRetentionChange}
                className="mb-4"
                min={0}
                max={365}
                placeholder="Enter number of days"
            />
            <Label htmlFor="stream-retention" className="block mb-2">
                Stream Retention Hours
            </Label>
            <Input
                id="stream-retention"
                value={streamRetention}
                onChange={handleStreamRetentionChange}
                className="mb-4"
                min={0}
                max={720}
                placeholder="Enter number of hours"
            />
            <Button onClick={handleSubmit} disabled={loading}>
                Save
            </Button>
        </div>
    )
}