import { getCookie } from './cookie'

export async function post(url, body={}) {
    return fetch(`/api${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCookie('csrf_access_token')
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })
}