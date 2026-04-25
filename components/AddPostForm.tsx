"use client"

import { useRouter } from 'next/navigation'
import { createPost } from '@/api/postAPI'
import { PostForm } from '@/components/PostForm'

export function AddPostForm() {
  const router = useRouter()

  const handleCreate = async (values: { title: string; content: string; image: string }) => {
    const response = await createPost(values)
    if (response?.status) {
      router.push('/admin/post')
    } else {
      throw new Error(response?.message || 'Unable to create post.')
    }
  }

  return <PostForm submitLabel="Create Post" onSubmit={handleCreate} />
}
