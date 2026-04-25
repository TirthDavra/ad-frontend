"use client"

import { deletePost, getAllPost } from '@/api/postAPI'
import { PostCard } from '@/components/post-card'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [post, setPost] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getAllPost()
      if (result.status) {
        setPost(result.data || [])
      } else {
        setError(result.message || 'Unable to load posts.')
      }
      setLoading(false)
    }
    fetchPost()
  }, [])

  const handleDelete = async (id: string) => {
    const response = await deletePost(id)
    if (response?.status) {
      setPost((posts) => posts.filter((item) => item._id !== id))
    } else {
      setError(response?.message || 'Unable to delete post.')
    }
  }

  if (loading) {
    return <p>Loading posts...</p>
  }

  return (
    <div>
      <div className="text-end mt-5 mr-5">
        <Link href="/admin/post/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create Post
        </Link>
      </div>
      {error ? <p className="my-4 text-red-600">{error}</p> : null}
      <div className="grid gap-4 lg:grid-cols-2 mt-5">
        {post.length ? (
          post.map((item) => (
            <PostCard
              key={item._id}
              title={item.title}
              content={item.content}
              image={item.image}
              isAdmin
              handleDelete={() => handleDelete(item._id)}
              handleEdit={() => router.push(`/admin/post/edit/${item._id}`)}
            />
          ))
        ) : (
          <div>
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
