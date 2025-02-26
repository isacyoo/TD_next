import { fetcher } from '@/util/api'
import Link from 'next/link'

async function getLocations() {
    const res = await fetcher('/locations')
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        return []
    }
}

export default async function Schedule() {
    const locations = await getLocations()
    return (
        <div>
            {locations.map(location => (
                <Location key={location.id} location={location} />
            ))}
        </div>
    )
}

function Location({ location }) {
    return (
        <Link href={`/settings/schedule/${location.id}`}>
            <h2>{location.name}</h2>
            <LocationScheduleMini schedule={location.operational_hours} />
        </Link>
    )
}

function LocationScheduleMini({ schedule }) {
    const dow = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "pub"]
    return (
        <div>
            {dow.map(day => (
                <LocationScheduleMiniBox key={day} dow={day} operational={schedule[day].length != 0} />
            ))}
        </div>
    )
}

function LocationScheduleMiniBox({ dow, operational }) {
    const initial = dow[0].toUpperCase()
    return (
        <div className={`w-8 h-8 ${operational ? 'bg-green-500' : 'bg-red-500'}`}>
            <p>{initial}</p>
        </div>
    )
    
}