'use server'

import { IResponse } from "@/interfaces/response"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const secretKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, secretKey, { algorithms: ['HS256'] })
    
    return payload
}

export async function login(formData: FormData): Promise<IResponse> {
    const user = { email: formData.get('email'), password: formData.get('password') }
    
    const response = await fetch('http://localhost:4000/api/auth/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()
    if(response.ok) {
        // const decodeToken = await decrypt(data.token)
        cookies().set('access_token', data.originalToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) , httpOnly: true, sameSite: 'lax', secure: false })

        return { ...data, success: true }
    }

    return { message: 'Invalid credentials', success: false, ...data }
}

export async function logOut() {
    cookies().set('access_token', '', { expires: new Date(0) })
}

export async function getSession() {
    const cookie = cookies().get('access_token')?.value
    if(!cookie) return null

    return cookie
}

export async function updateSession(request: NextRequest) {
    const session = request?.cookies?.get('access_token')?.value
    if(!session) return

    console.log("Session: ", session)

    const res = NextResponse.next()
    res.cookies.set({
        name: 'access_token',
        value: session,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    })
    return res
}