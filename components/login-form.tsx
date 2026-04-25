"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"
import {  signIn } from "@/api/authAPI"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [fromData, setFromData] = useState({
    email: '', 
    password:""
  })
  const { login, user } = useAuth();
  const router = useRouter();


  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value 
    }))
  }


  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setError(null)
    const result = await signIn(fromData)
    if (result?.status) {
      login({
        _id: result.data.user._id,
        email: result.data.user.email,
        name: result.data.user.name,
        token: result.data.token,
        role: result.data.user.role,
      })
      if (result.data.user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
      setFromData({ email: '', password: '' })
    } else {
      setError(result?.message || 'Invalid credentials')
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                name="email"
                value={fromData.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  
                </div>
                <Input 
                id="password" 
                type="password" 
                required
                   name="password"
                value={fromData.password}
                  onChange={handleChange}

                />
              </Field>
              <Field>
                <Button type="button" onClick={handleSave}>Login</Button>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
