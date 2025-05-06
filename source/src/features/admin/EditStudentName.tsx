"use client"

import { z } from "zod"
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
import { useRouter } from "next/navigation"
import { DialogClose } from "@/components/ui/dialog"
import { updateStudentName } from "./actions"

export const editFeeTitleFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
})

export function EditStudentNameForm({
  studentId
}: {
  studentId: number
}) {
  const form = useForm<z.infer<typeof editFeeTitleFormSchema>>({
    resolver: zodResolver(editFeeTitleFormSchema),
    defaultValues: {
      firstName: "",
      lastName: ""
    },
    mode: "onTouched"
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof editFeeTitleFormSchema>) {
    await updateStudentName(studentId, values)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
