"use client"

import { useEffect, useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface PostFormValues {
  title: string
  content: string
  image: string
}

interface PostFormProps {
  initialData?: PostFormValues
  submitLabel: string
  onSubmit: (data: PostFormValues) => Promise<void>
}

export function PostForm({ initialData, onSubmit, submitLabel }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormValues>(
    initialData || { title: '', content: '', image: '' }
  )
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setError(null)
    setIsSaving(true)

    if (!formData.title || !formData.content || !formData.image) {
      setError('All fields are required.')
      setIsSaving(false)
      return
    }

    try {
      await onSubmit(formData)
    } catch (submitError) {
      setError('Unable to save post. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{submitLabel}</CardTitle>
        <CardDescription>Enter your post details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Post title" />
          </Field>
          <Field>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <Input id="content" name="content" type="text" value={formData.content} onChange={handleChange} placeholder="Post content" />
          </Field>
          <Field>
            <FieldLabel htmlFor="image">Image URL</FieldLabel>
            <Input id="image" name="image" type="url" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            <FieldDescription>Provide a valid image URL.</FieldDescription>
          </Field>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <FieldGroup>
            <Field>
              <Button type="button" onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? 'Saving...' : submitLabel}
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
