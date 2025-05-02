import { getActions } from '@/util/serverFetch'
import Filter from './Filter'

export default async function FilterWrapper({ locationId, history, fav }) {
    const actions = history ? await getActions() : []

    return (
        <Filter actions={actions} locationId={locationId} history={history} fav={fav}/>
    )

}