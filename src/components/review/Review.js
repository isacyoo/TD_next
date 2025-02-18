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

async function getAllRelatedVideos(id) {
    const res = await fetcher(`/all_videos_with_first_entry_video_id/${id}`)
    if (res.ok) {
        const { action, videos, location } = await res.json()
        return { found: true, videos: videos, action: action, locationId: location }
    }
    if (res.status=== 400) {
        return { found: false, videos: [], action: {id: null, name: ''}, locationId: null }
    }
    throw new Error(res.status)
}

async function getAdjacentEvents(id) {
    const res = await fetcher(`/adjacent_events/${id}`)
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

export default async function Review({ id }) {
    const [ event, adjacentEvents, actions ] = await Promise.all([getEvent(id), getAdjacentEvents(id), getActions()])
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
        <div className='flex'>
            <VideoPanel videoUrls={urls}/>
            <UserPanel entriesInfo={event.entries} actions={actions} currentAction={event.action} adjacentEvents={adjacentEvents} location={event.location}/>
        </div>
    )
}