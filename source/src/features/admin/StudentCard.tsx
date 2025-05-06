import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { MoveUpRightIcon } from "lucide-react"

export default function StudentCard({
  id,
  firstName,
  lastName,
  totalBalance,
  email
}: {
  id: string
  firstName: string
  lastName: string
  totalBalance: string
  email: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{firstName} {lastName}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm">Total balance</div>
        {Number(totalBalance) > 1 ? (
          <div className="font-geist font-bold text-2xl">PHP {totalBalance}</div>
        ) : (
          <div className="font-geist font-bold text-2xl text-emerald-500">Fully paid</div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/${id}`} className={buttonVariants({ variant: "ghost" })}>
          <div>view student</div>
          <MoveUpRightIcon size="16" />
        </Link>
      </CardFooter>
    </Card>
  )
}
