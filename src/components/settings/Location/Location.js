import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { fetcher } from "@/util/api"
import LocationNameChange from "./LocationNameChange"
import Compliance from "@/components/settings/Location/Compliance"
import { SettingsH1 } from "@/components/settings/SettingsHeaders"
import LocationScheduleLink from "./LocationScheduleLink"
import { Separator } from "@/components/ui/separator"
import LocationHighRisk from "./LocationHighRisk"

async function getLocations() {
    const res = await fetcher("/locations")
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    return data
}

export default async function LocationsSettings({ locationId }) {
    const locations = await getLocations()
    return (
        <div>
            <SettingsH1>Manage location configurations</SettingsH1>
            <Accordion defaultValue={locationId} type="single" collapsible>
                {locations.map((location) => (
                    <AccordionItem key={location.id} value={location.id}>
                        <AccordionTrigger>
                            {location.name}
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                            <LocationNameChange
                                locationId={location.id}
                                locationName={location.name}
                            />
                            <Separator className="my-8"/>
                            <Compliance
                                videoRetentionDays={location.video_retention_days}
                                streamRetentionHours={location.stream_retention_hours}
                                type="location"
                                locationId={location.id}
                            />
                            <Separator className="my-8"/>
                            <LocationScheduleLink locationId={location.id} />
                            <Separator className="my-8"/>
                            <LocationHighRisk reviewHighRiskMembers={location.review_high_risk_members} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )


}