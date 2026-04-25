"use client"

import { getAllPost } from "@/api/postAPI"
import Navbar from "@/components/Navbar"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import AdBanner from "@/components/AdBanner"

export default function Page() {

  const [post, setPost] = useState([
    {
      _id: "",
      title:"",
      content: "",
      image:""
    }
  ])

  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchPost = async () => {
    setLoading(true)
    const result = await getAllPost();
    setPost(result?.data || [])
    setLoading(false)
  }
  fetchPost()
},[])

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh] mt-5">
          <p className="text-lg text-gray-600">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <div className="my-6">
  <AdBanner adSlot="1234567891" adFormat="horizontal" />
</div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 px-4">
      {post?.length > 0 ? post?.map((item) => (
        <PostCard 
          key={item?._id}
          title={item?.title || ""}
          content={item?.content || ""}
          image={item?.image || ""}
          />
        )) : (
          <div className="col-span-full flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-xl text-gray-500 mb-2">No posts found</p>
              <p className="text-gray-400">Check back later for new content.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
