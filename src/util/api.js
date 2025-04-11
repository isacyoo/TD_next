import { cookies } from 'next/headers'

function decodeJWT(token) {
    const tokenArray = token.split('.')
    return JSON.parse(atob(tokenArray[1]))
}

export async function fetcher(url) {
    const cookieStore = await cookies()
    
    return fetch(`${process.env.API_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value}`
        }
    })
}

export function getSession() {
    return fetcher('/user-info')
}

export async function isAuthenticated(request) {
    const accessToken = request.cookies.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value
    const res = await fetch(`${process.env.API_URL}/is-authenticated`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return res.ok
}

export async function shouldRenewToken(request) {
    const accessToken = request.cookies.get(process.env.ACCESS_TOKEN_COOKIE_NAME)?.value
    if (!accessToken) {
        return false
    }

    const tokenData = decodeJWT(accessToken)
    const currentTime = Date.now() / 1000
    if (tokenData.exp < currentTime) {
        console.log('Token expired')
        return false
    }

    return tokenData.exp - currentTime < process.env.REFRESH_THRESHOLD
}

export async function renewToken(request) {
    console.log("Renewing token")
    const res = fetch(`${process.env.API_URL}/refresh`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${request.cookies.get(process.env.REFRESH_TOKEN_COOKIE_NAME)?.value}`
                        },
                    })

    if (res.ok) {
        const data = await res.json()
        request.cookies.set(process.env.ACCESS_TOKEN_COOKIE_NAME, data.access_token)
    }
}