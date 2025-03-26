import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function decodeJWT(token) {
    const tokenArray = token.split('.')
    return JSON.parse(atob(tokenArray[1]))
}

async function renewToken() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value
    if (!accessToken) {
        return
    }

    const tokenData = decodeJWT(accessToken)
    const currentTime = Date.now() / 1000
    if (tokenData.exp < currentTime) {
        console.log('Token expired')
        return
    }

    if (tokenData.exp - currentTime > process.env.REFRESH_THRESHOLD) {
        return
    }

    fetch(`${process.env.API_URL}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get(process.env.REFRESH_TOKEN_COOKIE_NAME)?.value}`,
        },
    }).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                cookieStore.set(process.env.ACCESS_TOKEN_COOKIE_NAME, data.access_token)
            })
        }
    })
}

export async function fetcher(url) {
    const cookieStore = await cookies()
    renewToken()
    
    return fetch(`${process.env.API_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value}`
        }
    })
}

export function getSession() {
    return fetcher('/user_info')
}

export async function isAuthenticated(request) {
    const accessToken = request.cookies.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value
    const res = await fetch(`${process.env.API_URL}/is_authenticated`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return res.ok
}