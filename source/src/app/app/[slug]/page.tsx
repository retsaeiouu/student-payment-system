import { getNameByStudentId, receiptDetails } from "@/features/student/actions"
import DownloadReceipt from "@/features/student/DownloadReceipt"

export default async function PaymentDetails({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await receiptDetails(Number(slug))
  const name = await getNameByStudentId(data!.fee.StudentId)

  return (
    <div className="flex flex-col w-4xl mx-auto">
      <div className="font-medium text-2xl text-muted-foreground">
        Paid with {data?.method}
      </div>
      <div className="text-muted-foreground">
        at {data?.paidAt.toLocaleString()}
      </div>
      <div className="mt-8 text-muted-foreground">
        Paid amount
      </div>
      <div className="text-5xl font-bold">
        PHP {data?.amount}
      </div>
      <div className="mt-2 font-medium text-2xl text-muted-foreground">
        Paid for {data?.fee.name}
      </div>
      <div className="text-xl text-muted-foreground">
        Account number: {data?.reference}
      </div>
      <div className="mb-8 text-xl text-muted-foreground">
        Account name: {name}
      </div>
      <DownloadReceipt />
    </div>
  )
}
