"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation";
import { newPayment } from "./actions";

export const payMayaFormSchema = z.object({
  accountNumber: z.string().min(1, "Invalid account number").regex(/^(?!0\d)\d+(\.\d+)?$/, "Invalid account number"),
  amount: z.string().min(1, "Invalid amount").regex(/^(?!0\d)\d+(\.\d+)?$/, "Invalid amount"),
})

export default function PayMayaForm() {
  const params = useSearchParams()
  const feeId = params.get('fee')
  const balance = params.get('balance')

  const form = useForm<z.infer<typeof payMayaFormSchema>>({
    resolver: zodResolver(payMayaFormSchema),
    defaultValues: {
      accountNumber: "",
      amount: ""
    },
    mode: "onTouched"
  })

  async function onSubmit(values: z.infer<typeof payMayaFormSchema>) {
    console.log(values, feeId)
    await newPayment(Number(feeId), Number(values.amount), Number(values.accountNumber), "PayMaya")
  }

  return (
    <Dialog>
      <DialogTrigger className="my-4" asChild>
        <Button variant="ghost" className="justify-start">
          <Image src="/paymaya.png" alt="paymaya" width={40} height={40} />
          <div className="text-xl font-semibold">PayMaya</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Pay with PayMaya</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account number</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXXXXXXXXX" {...field} />
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
                    <Input placeholder="500.00" type="number" min={1} max={Number(balance)} {...field} />
                  </FormControl>
                  <FormDescription>You still have PHP {balance} amount to pay.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.isValid ? (
              <Button type="submit">Confirm and pay</Button>
            ) : (
              <Button type="submit" disabled>Confirm and pay</Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
