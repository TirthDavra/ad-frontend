"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

export default function AdminNavbar() {
  const { logout } = useAuth()

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/admin/dashboard" className="hover:text-sky-300">
            Dashboard
          </Link>
          <Link href="/admin/post" className="hover:text-sky-300">
            Posts
          </Link>
          <Link href="/admin/users" className="hover:text-sky-300">
            Users
          </Link>
        </div>
        <Button onClick={logout} className="bg-sky-500 hover:bg-sky-600">
          Logout
        </Button>
      </div>
    </nav>
  )
}
