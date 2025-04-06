import { fetcher } from "@/util/api"
import Filter from './Filter'


async function getActions() {
    const res = await fetcher('/actions')
    if (res.ok) {
        return await res.json()
    }

    throw new Error(res.status)
}

export default async function FilterWrapper({ locationId, history, fav }) {
    const actions = history ? await getActions() : []

    return (
        <Filter actions={actions} locationId={locationId} history={history} fav={fav}/>
    )

}