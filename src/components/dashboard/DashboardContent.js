import Pagination from "./Pagination/Pagination"
import DashboardTable from "./Table/Table"
import { fetcher } from "@/util/api"

function getEndpoint(locationId, page, history, fav, params) {
    if (history) {
        return `/history_events/${locationId}/${page}?${params}`
    } else if (fav) {
        return `/saved_events/${locationId}/${page}?${params}`
    } else {
        return `/unreviewed_events/${locationId}/${page}?${params}`
    }
} 

async function getEvents(url) {
    const res = await fetcher(url)
    if (res.ok) {
        return { pageValid: true, events: await res.json() }
    }
    if (res.status === 404) {
        return { pageValid: false, events: {
            events: [],
            per_page: 0,
            pages: 0,
            total: 0,
            iter_pages: []
        } }
    }
    throw new Error(res.status)
}

export default async function DashboardContent({ history, params, locationId, page, fav }) {
    const endpoint = getEndpoint(locationId, page, history, fav, params)
    const { events, pageValid } = await getEvents(endpoint)

    return (
        <>
            <DashboardTable events={events.events} history={history} pageValid={pageValid} params={params} fav={fav}/>
            <Pagination currentPage={page} perPage={events.per_page} pages={events.pages} total={events.total} iterPages={events.iter_pages} locationId={locationId} history={history}/>
        </>
    )
}