import { fetcher } from '@/util/api';
import ActionsTable from './ActionsTable';

async function getActions() {
    const res = await fetcher('/actions')
    if (res.ok) {
        return res.json()
    } else {
        throw new Error(res.status)
    }
}

export default async function ActionSettings() {
    const actions = await getActions()
    return (
        <div>
            <h1 className="font-extrabold text-2xl mb-4">Manage Actions</h1>
            <ActionsTable actions={actions} />
        </div>
    )
}