import Pagination from "./Pagination/Pagination"
import DashboardTable from "./Table/Table"
import { fetcher } from "@/util/api"

function getEndpoint(locationId, page, history, fav, params) {
    if (history) {
        return `/history-events/${locationId}/${page}?${params}`
    } else if (fav) {
        return `/saved-events/${locationId}/${page}?${params}`
    } else {
        return `/unreviewed-events/${locationId}/${page}?${params}`
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
            page_info: {
                per_page: 0,
                pages: 0,
                total: 0,
                iter_pages: []
            }
        } }
    }
    throw new Error(res.status)
}

export default async function DashboardContent({ history, params, locationId, page, fav }) {
    const endpoint = getEndpoint(locationId, page, history, fav, params)
    const { events, pageValid } = await getEvents(endpoint)
    const pageInfo = events.page_info

    return (
        <>
            <DashboardTable events={events.events} history={history} pageValid={pageValid} params={params} fav={fav}/>
            <Pagination currentPage={page} perPage={pageInfo.per_page} pages={pageInfo.pages} total={pageInfo.total} iterPages={pageInfo.iter_pages} locationId={locationId} history={history}/>
        </>
    )
}