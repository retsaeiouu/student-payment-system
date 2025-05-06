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
import { newFee } from "./actions"

export const newFeeFormSchema = z.object({
  name: z.string().min(1, "Invalid fee name"),
  amount: z.string().min(1, "Invalid amount").regex(/^(?!0\d)\d+(\.\d+)?$/, "Invalid amount"),
})

export function NewFeeForm({
  studentId
}: {
  studentId: number
}) {
  const form = useForm<z.infer<typeof newFeeFormSchema>>({
    resolver: zodResolver(newFeeFormSchema),
    defaultValues: {
      name: "",
      amount: ""
    },
    mode: "onTouched"
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof newFeeFormSchema>) {
    await newFee(studentId, values)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="50" {...field} />
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
