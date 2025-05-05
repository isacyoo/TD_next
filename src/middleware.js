import { NextResponse } from 'next/server'
import { isAuthenticated, shouldRenewToken, renewToken } from "@/util/api"

export const config = {
    matcher: '/((?!api|_next/static|_next/image).*)'
}

export async function middleware(request) {
    const authenticated = await isAuthenticated(request)
    if (authenticated && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/home', request.url))
    }
    if (!authenticated && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const shouldRenew = await shouldRenewToken(request)

    if (shouldRenew) {
        await renewToken(request)
    }

    const response = NextResponse.next()

    return response
}