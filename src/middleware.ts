import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = cookies().get('access_token')
  if(!cookie) return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/dashboard/:path*',
}