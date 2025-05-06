"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";

export default function PaymentRecords({
  datas
}: {
  datas: {
    id: number;
    amount: number;
    feeId: number;
    reference: number;
    method: string;
    paidAt: Date;
    name: string;
    balance: number;
  }[]
}) {
  const router = useRouter()

  return datas.length > 0 ? (
    <Table>
      <TableCaption>Record of previous transactions. Click a row to view its receipt</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[230px]">Fee title</TableHead>
          <TableHead className="w-[100px]">Method</TableHead>
          <TableHead>Date paid</TableHead>
          <TableHead className="w-[50px]">Paid amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data) => (
          <TableRow key={data.id} onClick={() => router.push(`/app/${data.id}`)}>
            <TableCell className="font-medium">{data.name}</TableCell>
            <TableCell>{data.method}</TableCell>
            <TableCell>{data.paidAt.toLocaleString()}</TableCell>
            <TableCell className="w-[50px]">PHP {data.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="self-center">No records yet</div>
  )
}
