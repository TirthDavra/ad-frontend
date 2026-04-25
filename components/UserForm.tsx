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

interface UserFormValues {
  name: string
  email: string
  role: 'user' | 'admin'
}

interface UserFormProps {
  initialData: UserFormValues
  onSubmit: (data: UserFormValues) => Promise<void>
  submitLabel: string
}

export function UserForm({ initialData, onSubmit, submitLabel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormValues>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setError(null)
    if (!formData.name || !formData.email) {
      setError('Name and email are required.')
      return
    }

    setIsSaving(true)
    try {
      await onSubmit(formData)
    } catch (err) {
      setError('Unable to update user. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{submitLabel}</CardTitle>
        <CardDescription>Update the user account information.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <FieldDescription>Grant or restrict admin access for this account.</FieldDescription>
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
