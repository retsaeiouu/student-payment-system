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
import { updateAmount } from "./actions"
import { useRouter } from "next/navigation"
import { DialogClose } from "@/components/ui/dialog"

export const editAmountFormSchema = z.object({
  amount: z.string().min(1, "Invalid amount").regex(/^(?!0\d)\d+(\.\d+)?$/, "Invalid amount"),
})

export function EditAmountForm({
  feeId,
  studentId
}: {
  feeId: number,
  studentId: string
}) {
  const form = useForm<z.infer<typeof editAmountFormSchema>>({
    resolver: zodResolver(editAmountFormSchema),
    defaultValues: {
      amount: "",
    },
    mode: "onTouched"
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof editAmountFormSchema>) {
    await updateAmount(feeId, Number(values.amount), studentId)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
