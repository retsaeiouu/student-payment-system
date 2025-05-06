import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MoveUpRightIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function StudentFeeCard({
  title,
  status,
  issuedAt,
  amount,
  feeId
}: {
  title: string
  status: string
  issuedAt: string
  amount: string
  feeId: number
}) {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>Issued at {issuedAt}</CardDescription>
        </div>
        {status === "PENDING" ? (
          <Badge>{status}</Badge>
        ) : (
          <Badge className="bg-emerald-600">{status}</Badge>
        )}
      </CardHeader>
      {status === "PENDING" && (
        <CardContent>
          <div className="text-muted-foreground text-sm">Amount</div>
          <div className="flex items-center gap-2">
            <div className="font-geist font-bold text-2xl">PHP {amount}</div>
          </div>
        </CardContent>
      )}
      <CardFooter>
        <Link href={`/app/payments?fee=${feeId}&balance=${amount}`} className={buttonVariants({ variant: "ghost" })}>
          <div>go to payment</div>
          <MoveUpRightIcon size="16" />
        </Link>
      </CardFooter>
    </Card >
  )
}
