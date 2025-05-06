import React from "react";
import { getAccountByCookie } from "@/features/sign-in/actions"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = await getAccountByCookie()
  if (!account) redirect('/sign-in')
  if (account.role === "STUDENT") redirect('/app')
  return children
}
