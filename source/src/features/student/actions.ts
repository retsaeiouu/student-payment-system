"use server"

import prisma from "@/shared/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getStudentByAccountEmail(accountEmail: string) {
  return await prisma.student.findUnique({
    where: { accountEmail },
    include: { fees: true }
  })
}

export async function newPayment(feeId: number, amount: number, reference: number, method: string) {
  const created = await prisma.payment.create({
    data: {
      amount,
      method,
      paidAt: new Date(),
      reference,
      feeId
    }
  })

  const balance = await prisma.fee.findUnique({ where: { id: feeId }, select: { amount: true } })
  const result = balance!.amount - amount

  if (result > 0) {
    await prisma.fee.update({
      where: { id: feeId },
      data: { amount: result }
    })
  } else {
    await prisma.fee.update({
      where: { id: feeId },
      data: { amount: result, status: "PAID" }
    })
  }

  revalidatePath('/app')
  revalidatePath(`/app/${created.id}`)
  redirect(`/app/${created.id}`)
}

export async function receiptDetails(paymentId: number) {
  return await prisma.payment.findUnique({ where: { id: paymentId }, include: { fee: true } })
}

export async function getNameByStudentId(id: number) {
  const data = await prisma.student.findUnique({ where: { id }, select: { firstName: true, lastName: true } })
  return `${data?.firstName} ${data?.lastName}`
}

export async function getPaymentsByAccountEmail(accountEmail: string) {
  const student = await getStudentByAccountEmail(accountEmail)
  const fees = await prisma.fee.findMany({ where: { StudentId: student!.id }, include: { payments: true } })
  const payments: {
    id: number;
    amount: number;
    feeId: number;
    reference: number;
    method: string;
    paidAt: Date;
  }[] = []

  fees.forEach((fee) => {
    fee.payments.forEach((pay) => payments.push(pay))
  })

  return payments
}

export async function getFeesByAccountEmail(accountEmail: string) {
  const student = await getStudentByAccountEmail(accountEmail)
  return await prisma.fee.findMany({ where: { StudentId: student!.id }, include: { payments: true } })
}
