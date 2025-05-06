import { getAccountByCookie } from "@/features/sign-in/actions"
import { redirect } from "next/navigation"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import SignOutButton from "@/features/admin/SignOutButton"
import { UserRoundIcon } from "lucide-react"
import { getFeesByAccountEmail, getStudentByAccountEmail } from "@/features/student/actions"
import StudentFeeCard from "@/features/student/StudentFeeCard"
import PaymentRecords from "@/features/student/PaymentRecords"

export default async function App() {
  const account = await getAccountByCookie()

  if (!account) redirect('/sign-in')

  const studentAccount = await getStudentByAccountEmail(account.email)

  if (!studentAccount) redirect('/sign-in')

  const totalBalance = studentAccount.fees.reduce((total, fee) => total + fee.amount, 0)
  const pendingFees = studentAccount.fees.filter((fee) => fee.status === "PENDING")

  const fees = await getFeesByAccountEmail(account.email)
  const datas: {
    id: number;
    amount: number;
    feeId: number;
    reference: number;
    method: string;
    paidAt: Date;
    name: string;
    balance: number;
  }[] = []
  let title: string = ""
  let balance: number = 0

  fees!.forEach((fee) => {
    title = fee.name
    balance = fee.amount
    fee.payments.forEach((payment) => {
      datas.push({ ...payment, name: title, balance })
    })
  })

  return (
    <div className="flex flex-col w-4xl mx-auto gap-8 pb-4">
      {/* header */}
      <div className="flex items-center py-2">
        <div className="text-xl font-bold mr-auto">Online Payment System</div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2">
              <UserRoundIcon size={16} />
              {account.email}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <SignOutButton />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      {/* header */}
      <div className="flex flex-col">
        <div className="text-muted-foreground">Total balance</div>
        <div className="text-4xl font-bold">PHP {totalBalance}</div>
      </div>
      {/* pending */}
      <div className="mt-12 self-center text-muted-foreground">Pending fees</div>
      <div className="grid grid-cols-2 gap-4">
        {pendingFees.map((fee) => (
          <div key={fee.id}>
            <StudentFeeCard
              title={fee.name}
              amount={fee.amount.toString()}
              status={fee.status}
              issuedAt={fee.dateCreated.toLocaleDateString()}
              feeId={fee.id}
            />
          </div>
        ))}
      </div>
      {/* pending */}
      {/* payment records */}
      <div className="self-center text-muted-foreground">Payment records</div>
      <PaymentRecords datas={datas} />
    </div>
  )
}
