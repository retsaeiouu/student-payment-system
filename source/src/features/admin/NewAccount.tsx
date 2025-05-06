"use client"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { newStudentAccount } from './actions'
import { useState } from 'react'

export const newStudentFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password is too short"),
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
})

export default function NewAccountForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof newStudentFormSchema>>({
    resolver: zodResolver(newStudentFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    mode: "onTouched"
  })

  const [error, setError] = useState<string | null>(null)

  async function onSubmit(values: z.infer<typeof newStudentFormSchema>) {
    const result = await newStudentAccount(values)
    if (result && !result.success) {
      setError(result.message)
      return
    } else {
      setError(null)
      router.push('/dashboard')
      return
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-md self-center">
      <div className="text-4xl font-bold self-center">New student</div>
      {error && <div className="text-red-500 font-medium">{error}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  )
}
