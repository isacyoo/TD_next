import Pagination from "./Pagination/Pagination"
import DashboardTable from "./Table/Table"
import { fetcher } from "@/util/api"

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

export default async function DashboardContent({ history, params, locationId, page }) {
    const { events, pageValid } = history ? await getEvents(`/history_events/${locationId}/${page}?${params}`) : await getEvents(`/unreviewed_events/${locationId}/${page}?${params}`)

    return (
        <>
            <DashboardTable events={events.events} history={history} pageValid={pageValid} params={params} />
            <Pagination currentPage={page} perPage={events.per_page} pages={events.pages} total={events.total} iterPages={events.iter_pages} locationId={locationId} history={history}/>
        </>
    )
}