"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '@/api/userAPI'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getAllUsers()
      if (!response?.status) {
        setError(response?.message || 'Unable to load users.')
      } else {
        setUsers(response.data || [])
      }
      setLoading(false)
    }

    loadUsers()
  }, [])

  const handleDelete = async (id: string) => {
    const response = await deleteUser(id)
    if (response?.status) {
      setUsers((prev) => prev.filter((user) => user._id !== id))
    } else {
      setError(response?.message || 'Unable to delete user.')
    }
  }

  if (loading) {
    return <p>Loading users...</p>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-black font-semibold">User Management</h1>
      </div>
      {error ? <p className="mb-4 text-red-600">{error}</p> : null}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-3 text-sm text-slate-700">{user.name}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{user.email}</td>
                <td className="px-4 py-3 text-sm text-slate-700 capitalize">{user.role}</td>
                <td className="px-4 py-3 text-sm text-right space-x-2">
                  <Link href={`/admin/users/${user._id}/edit`} className="rounded-md border text-black border-slate-300 bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(user._id)} className="rounded-md bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
