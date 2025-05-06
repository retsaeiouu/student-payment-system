import { Badge } from "@/components/ui/badge"
import { getStudentById } from "@/features/admin/actions"
import FeeCard from "@/features/admin/FeeCard"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, SquarePenIcon } from "lucide-react"
import { EditStudentNameForm } from "@/features/admin/EditStudentName"
import DeleteStudentButton from "@/features/admin/DeleteStudent"
import { NewFeeForm } from "@/features/admin/NewFee"
import Link from "next/link"

export default async function StudentDetail({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const student = await getStudentById(Number(slug))
  // const paidFees = student?.fees.filter((fee) => fee.status === "PAID")
  const pendingFees = student?.fees.filter((fee) => fee.status === "PENDING")

  return (
    <div className="flex flex-col w-4xl mx-auto gap-8 pb-4">
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
      {student ? (
        <>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="pb-4 font-sans text-4xl font-bold">{student.firstName} {student.lastName}</div>
              {/*edit name button*/}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <SquarePenIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit student name</DialogTitle>
                  </DialogHeader>
                  <EditStudentNameForm studentId={student.id} />
                </DialogContent>
              </Dialog>
              {/*edit name button*/}
              <DeleteStudentButton studentId={student.id} />
              {/*new fee*/}
              {student && (
                <Dialog>
                  <DialogTrigger asChild className="ml-auto">
                    <Button>
                      Add fee
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a new student fee</DialogTitle>
                    </DialogHeader>
                    <NewFeeForm studentId={student.id} />
                  </DialogContent>
                </Dialog>
              )}
              {/*new fee*/}
            </div>
            <div className="font-geist text-lg font-medium text-muted-foreground">Total balance:</div>
            <div className="font-bold text-2xl">PHP {student.totalBalance.toString()}</div>
          </div>

          {/* fees */}
          <div className="flex flex-col gap-2">
            <div className="self-center font-geist text-lg font-medium text-muted-foreground">Pending</div>
            <div className="grid grid-cols-2 gap-4">
              {pendingFees?.map((fee) => (
                <div key={fee.id} className="col-span-1">
                  <FeeCard
                    feeId={fee.id}
                    studentId={slug}
                    title={fee.name}
                    status={fee.status}
                    issuedAt={fee.dateCreated.toLocaleDateString()}
                    amount={fee.amount.toString()}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="font-sans text-xl self-center">Student not found.</div>
      )}
    </div>
  )
}
