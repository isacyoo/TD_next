import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CiSettings } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton"
import { fetcher } from "@/util/api"


async function getLocation(locationId) {
    const res = await fetcher(`/location/${locationId}`)
    if (res.ok) {
        return await res.json()
    }
    throw new Error(res.status)
}

export default async function DashboardHeader({ locationId, history, fav }) {
    const location = await getLocation(locationId)
    const locationName = location.name

    return (
        <div className="flex justify-between items-center py-8 mb-4 w-full border-b-primary/60 border-b-2">
            <h1 className="text-2xl font-bold text-primary mr-4">{locationName}</h1>
            <div className="flex items-center">
                <Link href={`/settings/locations?locationId=${locationId}`}>
                    <Button variant="icon" className="my-2 mr-4 hover:bg-primary/10">
                        <CiSettings />
                    </Button>
                </Link>
                <Link href={`/${locationId}/dashboard/1`}>
                    <Button variant="secondary" className={`${ (!history && !fav) ? "border-primary border-2 font-bold" : ""} my-2 mr-4 hover:bg-primary/10`}>Review events</Button>
                </Link>
                <Link href={`/${locationId}/history/1`}>
                    <Button variant="secondary" className={`${ history ? "border-primary border-2 font-bold" : ""} my-2 mr-4 hover:bg-primary/10`}>History</Button>
                </Link>
                <Link href={`/${locationId}/favourites/1`}>
                    <Button variant="secondary" className={`${ fav ? "border-primary border-2 font-bold" : ""} my-2 hover:bg-primary/10`}>Saved events</Button>
                </Link>
            </div>
        </div>
    )
}

export function DashboardHeaderSkeleton() {
    return (
        <div className="flex justify-between items-center py-8 mb-4 w-full border-b-primary/60 border-b-2">
            <Skeleton className="h-[36px] w-1/4 mr-4"/>
            <div className="flex items-center">
                <Skeleton className="h-[36px] w-[48px] mr-4 my-2"/>
                <Skeleton className="h-[36px] w-[134px] mr-4 my-2"/>
                <Skeleton className="h-[36px] w-[80px] mr-4 my-2"/>
                <Skeleton className="h-[36px] w-[121px] my-2"/>
            </div>
        </div>
    )
}