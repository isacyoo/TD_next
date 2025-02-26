import LocationSchedule from "@/components/settings/Schedule/LocationSchedule";

export default async function LocationSchedulePage({ params }) {
    const { locationId } = await params;
    return (
        <div>
            <LocationSchedule locationId={locationId} />
        </div>
    );
}