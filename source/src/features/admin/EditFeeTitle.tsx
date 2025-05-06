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
import { updateFeeTitle } from "./actions"

export const editFeeTitleFormSchema = z.object({
  title: z.string().min(1, "Invalid fee name"),
})

export function EditFeeTitleForm({
  feeId,
  studentId
}: {
  feeId: number,
  studentId: string
}) {
  const form = useForm<z.infer<typeof editFeeTitleFormSchema>>({
    resolver: zodResolver(editFeeTitleFormSchema),
    defaultValues: {
      title: "",
    },
    mode: "onTouched"
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof editFeeTitleFormSchema>) {
    await updateFeeTitle(feeId, values.title, studentId)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
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
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
