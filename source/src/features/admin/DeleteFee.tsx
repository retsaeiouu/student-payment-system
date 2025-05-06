"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteFee } from "./actions"
import { useRouter } from "next/navigation"

export default function DeleteFeeButton({
  feeId,
  studentId
}: {
  feeId: number
  studentId: string
}) {
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="mx-auto">
        <Button variant="ghost" className="text-destructive">Delete fee</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this fee?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={
            async () => {
              await deleteFee(feeId, studentId)
              router.refresh()
            }
          }>Yes, i want to delete this fee</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
