import { fetcher } from '@/util/api'
import Link from 'next/link'
import { CiStreamOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import ScheduleSkeleton from './ScheduleSkeleton';
import { Suspense } from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

async function getLocations() {
    const res = await fetcher('/locations')
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        return []
    }
}

export default async function ScheuduleWithSuspense() {
    return (
        <Suspense fallback={<ScheduleSkeleton />}>
            <Schedule />
        </Suspense>
    )
}

async function Schedule() {
    const locations = await getLocations()
    return (
        <>
            <h1 className="font-extrabold text-2xl mb-4">Manage Schedule</h1>
            {locations.map(location => (
                <Location key={location.id} location={location} />
            ))}
        </>
    )
}

function Location({ location }) {
    return (
        <div className="bg-secondary/0 p-6 m-8 rounded-xl border-2 border-primary/60 shadow-sm hover:shadow-lg transition-shadow duration-300">
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
            <Tooltip openDelay={0} closeDelay={0}>
                <TooltipTrigger>
                    <CiStreamOn />
                </TooltipTrigger>
                <TooltipContent side="top">
                    <span className="text-xs">Videos generated from RTSP stream directly</span>
                </TooltipContent>
            </Tooltip>
        )
    } else if (method == "UserUpload") {
        return (
            <Tooltip openDelay={0} closeDelay={0}>
                <TooltipTrigger>
                    <FaRegUser />
                </TooltipTrigger>
                <TooltipContent side="top">
                    <span className="text-xs">Videos uploaded by user</span>
                </TooltipContent>
            </Tooltip>
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
        <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger>
                <p className={`text-xs px-2 py-1 m-1 rounded ${operational ? 'bg-green-300' : 'bg-red-300'}`}>{initial}</p>
            </TooltipTrigger>
            <TooltipContent side="top">
                <span className="text-xs">{hoverMessage}</span>
            </TooltipContent>
        </Tooltip>
    )    
}