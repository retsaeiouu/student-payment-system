import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getAllStudents } from "@/features/admin/actions"
import StudentCard from "@/features/admin/StudentCard"
import Link from "next/link"
import SignOutButton from "@/features/admin/SignOutButton"

export default async function Dashboard() {
  const students = await getAllStudents()

  return (
    <div className="flex flex-col w-4xl mx-auto gap-8 pb-4">
      {/* header */}
      <div className="py-2 flex items-center">
        <div className="flex items-center gap-4 mr-auto">
          <div className="text-xl font-bold py-2">Online Payment System</div>
          <Badge variant="outline">Admin</Badge>
        </div>
        <Link href="/dashboard/new-account" className={buttonVariants({ variant: "default" })}>New student account</Link>
        <SignOutButton />
      </div>
      {/* header */}
      <div className="<font-geist text-4xl font-bold">Students</div>
      <div className="grid grid-cols-2 gap-4">
        {students.map((student) => (
          <div className="col-span-1" key={student.id}>
            <StudentCard
              id={student.id.toString()}
              firstName={student.firstName}
              lastName={student.lastName}
              totalBalance={student.totalBalance.toString()}
              email={student.accountEmail}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
