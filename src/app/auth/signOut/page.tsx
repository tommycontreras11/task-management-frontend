'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { logOut } from "../../../../lib"

export default async function SignOutPage() {
    const router = useRouter()

    useEffect(() => {
        async function signOut() {
            await logOut()
            router.push('/auth/')
        }

        signOut()
    })
}