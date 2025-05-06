import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SquarePenIcon } from "lucide-react"
import { EditAmountForm } from "./EditAmountForm"
import { EditFeeTitleForm } from "./EditFeeTitle"
import DeleteFeeButton from "./DeleteFee"

export default function FeeCard({
  title,
  status,
  issuedAt,
  amount,
  feeId,
  studentId,
}: {
  title: string
  status: string
  issuedAt: string
  amount: string
  feeId: number
  studentId: string
}) {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <CardTitle>{title}</CardTitle>
            {/*edit title button*/}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <SquarePenIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Amount</DialogTitle>
                </DialogHeader>
                <EditFeeTitleForm feeId={feeId} studentId={studentId} />
              </DialogContent>
            </Dialog>
            {/*edit title button*/}
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
            {/*edit button*/}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <SquarePenIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Amount</DialogTitle>
                </DialogHeader>
                <EditAmountForm feeId={feeId} studentId={studentId} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      )}
      <CardFooter>
        <DeleteFeeButton feeId={feeId} studentId={studentId} />
      </CardFooter>
    </Card>
  )
}
