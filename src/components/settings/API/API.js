import APIKeyPanel from './APIKeyPanel'
import { fetcher } from '@/util/api'

export default async function API() {
    const apiKey = await getAPIKey()
    return (
        <div>
            <h1>API</h1>
            <APIKeyPanel apiKey={apiKey.api_key} />
        </div>
    )
}

async function getAPIKey() {
    const res = await fetcher('/api_key')
    if (res.ok) {
        return res.json()
    } else {
        throw new Error(res.status)
    }
}