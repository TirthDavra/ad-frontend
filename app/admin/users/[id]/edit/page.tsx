"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getUserById, updateUser } from '@/api/userAPI'
import { UserForm } from '@/components/UserForm'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [user, setUser] = useState({ name: '', email: '', role: 'user' as 'user' | 'admin' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadUser = async () => {
      const response = await getUserById(id)
      if (!response?.status) {
        setError(response?.message || 'Unable to load user.')
      } else {
        setUser(response.data)
      }
      setLoading(false)
    }

    loadUser()
  }, [id])

  const handleUpdate = async (values: { name: string; email: string; role: 'user' | 'admin' }) => {
    const response = await updateUser(id, values)
    if (response?.status) {
      router.push('/admin/users')
    } else {
      setError(response?.message || 'Unable to update user.')
    }
  }

  if (loading) {
    return <p>Loading user details...</p>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl text-black font-semibold mb-4">Edit User</h1>
      {error ? <p className="mb-4 text-red-600">{error}</p> : null}
      <UserForm initialData={user} onSubmit={handleUpdate} submitLabel="Update User" />
    </div>
  )
}
