import Link from "next/link"

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link href="/dashboard/users">Users</Link>
                </li>
                <li>
                    <Link href="/auth/">Login</Link>
                </li>
                <li>
                    <Link href="/auth/signOut">Salir</Link>
                </li>
            </ul>
        </nav>
    )
}