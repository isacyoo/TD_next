import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { fetcher } from "@/util/api"
import { SettingsH1 } from "@/components/settings/SettingsHeaders"
import LocationSetting from "./LocationSetting"

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
    const locationNames = locations.map((location) => location.name)
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
                            <LocationSetting location={location} locationNames={locationNames}/>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )


}