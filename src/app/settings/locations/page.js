import LocationsSettings from "@/components/settings/Location/Location"

export default async function LocationsSettingsPage({ searchParams }) {
    const { locationId } = await searchParams
    return (
        <LocationsSettings locationId={parseInt(locationId)}/>
    )
}