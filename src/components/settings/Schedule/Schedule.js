import { fetcher } from '@/util/api'
import Link from 'next/link'
import { CiStreamOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

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
            <h1 className="font-extrabold text-2xl mb-4">Locations</h1>
            {locations.map(location => (
                <Location key={location.id} location={location} />
            ))}
        </div>
    )
}

function Location({ location }) {
    return (
        <div className="bg-secondary/60 p-6 m-8 rounded-xl">
            <Link href={`/settings/schedule/${location.id}`}>
                <div className="flex justify-between items-center my-2">
                    <h2 className="font-bold">{location.name}</h2>
                    <UploadMethodIcon method={location.upload_method} />
                </div>
                <LocationScheduleMini schedule={location.operational_hours} />
            </Link>
        </div>
    )
}

function UploadMethodIcon({ method }) {
    if (method == "RTSP") {
        return (
        <div className="relative group">
            <CiStreamOn />
            <span className="absolute bottom-2 left-2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Videos generated from RTSP stream directly</span>
        </div>
        )
    } else if (method == "UserUpload") {
        return (
        <div className="relative group">
            <FaRegUser />
            <span className="absolute bottom-2 left-2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Videos uploaded by user</span>
        </div>
        )
    } else {
        return <></>
    }
}

function LocationScheduleMini({ schedule }) {
    const dow = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "pub"]
    return (
        <div className="flex">
            {dow.map(day => (
                <LocationScheduleMiniBox key={day} dow={day} daySchedule={schedule[day]} />
            ))}
        </div>
    )
}

function LocationScheduleMiniBox({ dow, daySchedule }) {
    const operational = daySchedule.length > 0
    const initial = dow[0].toUpperCase()
    const hoverMessage = operational ? JSON.stringify(daySchedule, null, 4) : "No schedule"
    return (
        <div className="relative group">
            <p className={`text-xs px-2 py-1 m-1 rounded ${operational ? 'bg-green-300' : 'bg-red-300'}`}>{initial}</p>
            <span className="absolute transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hoverMessage}</span>
        </div>
    )
    
}