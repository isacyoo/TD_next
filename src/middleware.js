import { NextResponse } from 'next/server'
import { isAuthenticated, shouldRenewToken, renewToken } from "@/util/api"

export const config = {
    matcher: '/((?!login|_next/static|_next/image).*)'
}

export async function middleware(request) {
    const authenticated = await isAuthenticated(request)
    if (!authenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const shouldRenew = await shouldRenewToken(request)

    if (shouldRenew) {
        await renewToken(request)
    }

    const response = NextResponse.next()

    return response
}