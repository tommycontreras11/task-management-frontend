'use client'

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { login } from "../../../../lib"

export default function SignInPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData =  new FormData(event.currentTarget)
        const response = await login(formData)

        if(response.success) {
            router.push('/dashboard')
        } else {
            setError(response.message)
        }
    }

    return (
        <section>
            <h1>Auth</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Submit</button>
                <label htmlFor="">Do not have an account?</label>
                <a href="/auth/signUp">Sign Up</a>
            </form>
        </section>
    )
}