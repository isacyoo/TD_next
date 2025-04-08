import { fetcher } from '@/util/api'
import WeekSchedule from './ModifyLocationSchedule'
import { SettingsH1 } from '@/components/settings/SettingsHeaders'

async function getLocation(locationId) {
    const res = await fetcher(`/location/${locationId}`)
    if (res.ok) {
        const data = await res.json()
        return data
    } else if (res.status === 404) {
        return {}
    } else {
        throw new Error(res.status)
    }
}

export default async function LocationSchedule({ locationId }) {
    const location = await getLocation(locationId)
    return (
        <div>
            <SettingsH1>{location.name}</SettingsH1>
            <WeekSchedule locationId={locationId} schedule={location.operational_hours} />
        </div>
    )
}