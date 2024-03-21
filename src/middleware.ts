import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
    const token = cookies().get('access_token')?.value

    if(!token) {
        redirect('/signIn')
    }
}

export const config = {
    matcher: '/dashboard/:path*'
}