import { getCookie } from './cookie'

export async function clientFetch(method, url, body={}) {
    return fetch(`/api${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCookie('csrf_access_token')
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })
}