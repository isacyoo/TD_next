import { NextResponse } from 'next/server'
import { isAuthenticated } from "@/util/api"

export const config = {
    matcher: '/((?!login|_next/static|_next/image).*)'
}

export async function middleware(request) {
    const authenticated = await isAuthenticated(request)
    if (!authenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = NextResponse.next()

    return response
}