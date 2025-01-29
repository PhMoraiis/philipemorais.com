import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = (await cookies()).get('access_token')
	const { pathname } = request.nextUrl

	if (pathname === '/login' && token) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (pathname.includes('/dashboard') && !token) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: '/:path*',
}
