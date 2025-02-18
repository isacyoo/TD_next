import { fetcher } from "@/util/api"

import Gallery from "./Gallery/Gallery"

async function getStats() {
    const res = await fetcher("/current_stats")
    if (res.ok) {
        return await res.json()
    }
    throw new Error(res.status)
}

export default async function Home() {
    const { total_unreviewed, location_stats } = await getStats()
    return (
        <div className="w-1/2">
            <Gallery totalUnreviewed={total_unreviewed} locationStats={location_stats}/>
        </div>
    )
}