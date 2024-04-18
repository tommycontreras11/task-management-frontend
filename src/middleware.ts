import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = cookies().get('access_token')?.value
    const url = req.nextUrl.clone()

    if(!token) {
        url.pathname = '/auth'
		return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/workspaces/:path*'
    ],
}