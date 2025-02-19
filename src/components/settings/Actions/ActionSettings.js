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
        <ActionsTable actions={actions} />
    )
}