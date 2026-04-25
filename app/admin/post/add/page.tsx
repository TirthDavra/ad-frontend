import { AddPostForm } from '@/components/AddPostForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            
          <div className="w-full max-w-sm">
            <AddPostForm />
          </div>
        </div>
  )
}

export default page