"use server"

import { z } from "zod"
import prisma from "@/shared/prisma"
import { cookies } from "next/headers"
import { formSchema } from "./form"
import { redirect } from "next/navigation"

export type SignInActionReturnType = {
  success: boolean,
  message: string
}

export async function signInAction(
  data: z.infer<typeof formSchema>
): Promise<SignInActionReturnType | void> {
  const cookie = await cookies()

  const account = await prisma.account.findUnique({
    where: { email: data.email }
  })

  if (!account || account.password !== data.password)
    return { success: false, message: "Invalid email or password" }

  cookie.set('accountId', String(account.id), { httpOnly: true })
}

export async function getAccountByCookie() {
  const cookie = await cookies()
  const id = cookie.get('accountId')

  if (!id) return null

  const foundAccount = await prisma.account.findUnique({
    omit: { password: true },
    where: { id: Number(id.value) }
  })

  return foundAccount
}

export async function handleAuthorization(role: "STUDENT" | "ADMIN") {
  if (role === "STUDENT") redirect('/app')
  else redirect('/dashboard')
}
