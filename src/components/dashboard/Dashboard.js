import { fetcher } from "@/util/api"
import Filter from './Filter/Filter'
import Pagination from "./Pagination/Pagination"
import DashboardTable from "./Table/Table"
import DashboardHeader from "./DashboardHeader"

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

async function getActions() {
    const res = await fetcher('/actions')
    if (res.ok) {
        return await res.json()
    }

    throw new Error(res.status)
}

async function getLocation(locationId) {
    const res = await fetcher(`/location/${locationId}`)
    if (res.ok) {
        return await res.json()
    }
    throw new Error(res.status)
}

export default async function Dashboard({ page, searchParams, locationId, history }) {
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
    if ( history ) {
        var [ { events, pageValid }, actions, location ] = await Promise.all([getEvents(`/history_events/${locationId}/${page}?${params}`), getActions(), getLocation(locationId)])
    }
    else {
        var [{ events, pageValid }, location] = await Promise.all([getEvents(`/unreviewed_events/${locationId}/${page}?${params}`), getLocation(locationId)])
        var actions = []
    }
    
    pageValid = pageValid || events.total == 0
    
    return (
        <div className="w-1/2">
            <DashboardHeader locationName={location.name} locationId={location.id} history={history}/>
            <Filter actions={actions} locationId={locationId} history={history}></Filter>
            <div>
                <DashboardTable events={events.events} history={history} pageValid={pageValid} params={params} />
                <Pagination currentPage={page} perPage={events.per_page} pages={events.pages} total={events.total} iterPages={events.iter_pages} locationId={locationId} searchParams={searchParams} history={history}/>
            </div>
        </div>

    )
}