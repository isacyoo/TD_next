import Card from "./Card"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from 'react'
import { fetcher } from "@/util/api"

async function getStats() {
    const res = await fetcher("/current-stats")
    if (res.ok) {
        return await res.json()
    }
    throw new Error(res.status)
}


export default async function Gallery() {
    const { total_unreviewed, location_stats } = await getStats()
    return (
        <Suspense fallback={<GallerySkeleton />}>
            <div className="flex justify-between items-center my-6">
                <h1 className="text-2xl font-bold">All locations</h1>
                <p className="text-sm text-gray-500">Total Unreviewed: {total_unreviewed}</p>
            </div>
            <div className="container grid m-auto sm:grid-cols-1 md:grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
                {location_stats.map((locationStat, i) => <Card locationStat={locationStat} key={i}></Card>)}
            </div>
        </Suspense>
        )
}

export function GallerySkeleton() {
    return (
        <>
            <div className="flex justify-between items-center my-6">
                <h1 className="text-2xl font-bold">All locations</h1>
                <p className="text-sm text-gray-500">Total Unreviewed: </p>
            </div>
            <div className="container grid m-auto sm:grid-cols-1 md:grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        </>
    )
}

function CardSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-56">
            <Skeleton className="h-[52px] w-full" />
            <div className="flex items-center justify-between">
                <Skeleton className="h-[34px] w-full mr-4" />
                <Skeleton className="h-[34px] w-full ml-4" />
            </div>
            <Skeleton className="h-[136px] w-full" />
        </div>
    )
}