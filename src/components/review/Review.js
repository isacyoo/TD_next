import { fetcher } from "@/util/api"
import VideoPanel from "@/components/review/VideoPanel/VideoPanel"
import UserPanel from "@/components/review/UserPanel/UserPanel"

async function getVideoUrl(id) {
    const res = await fetcher(`/video/${id}`)
    if (res.ok) {
        return await res.json()
    }
    if (res.status === 404) {
        return ''
    }
    throw new Error(res.status)
}

async function getEvent(id) {
    const res = await fetcher(`/event/${id}`)
    if (res.ok) {
        const json = await res.json()
        return { found: true, ...json }
    }

    if (res.status === 404) {
        return { found: false }
    }
    throw new Error(res.status)
}

async function getAdjacentEvents(id, params) {
    const res = await fetcher(`/adjacent-events/${id}?${params}`)
    if (res.ok) {
        return await res.json()
    }
    if (res.status === 404) {
        return {}
    }
    throw new Error(res.status)
}

async function getActions() {
    const res = await fetcher('/actions')
    if (res.ok) {
        return await res.json()
    }

    throw new Error(res.status)
}

export default async function Review({ id, searchParams, showAdjacentEvents }) {
    const params = new URLSearchParams()
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            if (Array.isArray(value)) {
                value.map((v) => params.append(key, v))
            }
            else {
                params.append(key, value)
            }
        }
    }
    const [ event, adjacentEvents, actions ] =  await Promise.all([getEvent(id), getAdjacentEvents(id, params), getActions()])
    if (!event.found) {
        return (
            <div>
                <h1>No videos found</h1>
            </div>
        )
    }

    const videoIds = event.entries.reduce((acc, entry) => {
        return acc.concat(entry.videos)
    }, [])

    const urls = await Promise.all(videoIds.map((video) => getVideoUrl(video.id)))

    return (
        <div className='flex my-2 sm:flex-col md:flex-col lg:flex-row xl:flex-row'>
            <VideoPanel videoUrls={urls}/>
            <UserPanel entriesInfo={event.entries} actions={actions} currentAction={event.action} adjacentEvents={adjacentEvents} location={event.location} params={params} showAdjacentEvents={showAdjacentEvents} saved={event.is_saved} eventId={event.id} comment={event.comment}/>
        </div>
    )
}