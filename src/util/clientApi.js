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

export async function del(url) {
    return fetch(`/api${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCookie('csrf_access_token')
        },
        credentials: 'include'
    })
}

export async function put(url) {
    return fetch(`/api${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}