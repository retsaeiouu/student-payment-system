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
import { signInAction, SignInActionReturnType } from '@/features/sign-in/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, "This field is required")
})

export default function SignInForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onTouched"
  })

  const [result, setResult] = useState<SignInActionReturnType>()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signInAction(values)

    if (result && !result.success) {
      setResult({ success: result.success, message: result.message })
      return
    }

    router.push('/')
  }

  return (
    <div className="flex flex-col items-center gap-8 w-md self-center">
      <div className="text-4xl font-bold self-center">Sign in</div>
      {result && !result.success && <div className="text-red-500 font-medium">{result.message}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
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
                  <Input placeholder="password" {...field} />
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
