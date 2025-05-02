import { getActions } from '@/util/serverFetch'
import ActionsTable from './ActionsTable';


export default async function ActionSettings() {
    const actions = await getActions()
    return (
        <div>
            <h1 className="font-extrabold text-2xl mb-4">Manage Actions</h1>
            <ActionsTable actions={actions} />
        </div>
    )
}