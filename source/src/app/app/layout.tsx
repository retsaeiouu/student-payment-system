import React from "react";
import { getAccountByCookie } from "@/features/sign-in/actions"
import { redirect } from "next/navigation"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = await getAccountByCookie()
  if (!account) redirect('/sign-in')
  if (account.role === "ADMIN") redirect('/dashboard')
  return children
}
