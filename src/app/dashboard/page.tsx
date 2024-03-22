'use client'

import { useEffect } from "react"
import { userLogged } from "../../../lib"

export default function DashboardPage() {
    useEffect(() => {
        async function me() {
            const user = await userLogged()
            console.log(user)
        }

        me()
    })
    return (
        <>
            <h1 className="text-3xl text-center">Dashboard</h1>
        </>
    )
}