import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import SignOutButton from "@/features/admin/SignOutButton"
import { UserRoundIcon } from "lucide-react"
import { getAccountByCookie } from "@/features/sign-in/actions"
import { redirect } from "next/navigation"
import { getPaymentsByAccountEmail } from "@/features/student/actions"

export default async function PreviousPayments() {
  const account = await getAccountByCookie()

  if (!account) redirect('/sign-in')

  // const payments = await getPaymentsByAccountEmail(account.email)

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
      <Table>
        <TableCaption>List of recent payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Fee title</TableHead>
            <TableHead className="w-[150px]">Method</TableHead>
            <TableHead>Date paid</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">j</TableCell>
            <TableCell>j</TableCell>
            <TableCell>j</TableCell>
            <TableCell className="text-right">j</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
