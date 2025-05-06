import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import NewAccountForm from "@/features/admin/NewAccount"
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

export default function NewAccount() {
  return (
    <div className="flex flex-col w-4xl mx-auto gap-8">
      {/* header */}
      <div className="flex items-center gap-4 py-2">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ChevronLeftIcon /> Back
          </Button>
        </Link>
        <div className="text-xl font-bold py-2">Online Payment System</div>
        <Badge variant="outline">Admin</Badge>
      </div>
      {/* header */}
      <NewAccountForm />
    </div>
  )
}
