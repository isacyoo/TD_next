"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { clientFetch } from "@/util/clientApi"
import { toast } from "sonner"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"
import { useRouter } from "next/navigation"

export default function LocationNameChange({ locationId, locationName }) {
    const [ name, setName ] = useState(locationName)
    const router = useRouter()

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        if (name.length < 1 || name.length > 36) {
            toast.error("Location name must be between 1 and 36 characters")
            return
        }
        const res = await clientFetch("PUT", `/location_settings/${locationId}`, { name })
        if (res.ok) {
            toast.success("Location name updated successfully")
            router.refresh()
        } else {
            toast.error("Failed to update location name")
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <SettingsH2>Location Name</SettingsH2>
            <div className="flex gap-2 mb-2">
                <Input id="location-name" value={name} onChange={handleNameChange} />
                <Button onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    )
}