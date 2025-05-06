"use client"

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "./actions";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" className="ml-2" onClick={async () => {
      await signOut()
      router.push('/sign-in')
    }}>
      <LogOutIcon /> Sign out
    </Button>
  )
}
