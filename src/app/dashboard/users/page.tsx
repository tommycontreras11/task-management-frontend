'use client'

import { useRouter } from "next/navigation"

export default function UsersPage() {
    const router = useRouter()

    return (
        <>
            <h1>Users</h1>
            <button type="button" onClick={() => router.push('/dashboard/')} >Go to dashboard</button>
        </>
    )

}