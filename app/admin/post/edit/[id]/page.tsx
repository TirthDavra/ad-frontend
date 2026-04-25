"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPostById, updatePost } from '@/api/postAPI'
import { PostForm } from '@/components/PostForm'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [post, setPost] = useState({ title: '', content: '', image: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadPost = async () => {
      setLoading(true)
      const response = await getPostById(id)
      if (!response?.status) {
        setError(response?.message || 'Unable to load post.')
      } else {
        setPost(response.data)
      }
      setLoading(false)
    }

    loadPost()
  }, [id])

  const handleUpdate = async (values: { title: string; content: string; image: string }) => {
    const response = await updatePost(id, values)
    if (response?.status) {
      router.push('/admin/post')
    } else {
      setError(response?.message || 'Unable to update post.')
    }
  }

  if (loading) {
    return <p>Loading post details...</p>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>
      {error ? <p className="mb-4 text-red-600">{error}</p> : null}
      <PostForm initialData={post} onSubmit={handleUpdate} submitLabel="Update Post" />
    </div>
  )
}
