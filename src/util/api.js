import { cookies } from 'next/headers'

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

    fetch(`${process.env.API_URL}/api/refresh`, {
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
    
    return fetch(`${process.env.API_URL}/api${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value}`
        }
    })
}

export function getSession() {
    return fetcher('/user_info')
}