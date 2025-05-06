"use server"

import { z } from "zod";
import { newStudentFormSchema } from "./NewAccount";
import prisma from "@/shared/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type NewStudentAccountReturnType = { result: boolean, message: string } | void

export async function newStudentAccount(data: z.infer<typeof newStudentFormSchema>) {
  const foundAccount = await prisma.account.findUnique({ where: { email: data.email } })

  if (foundAccount) return { success: false, message: "Email already exists" }

  await prisma.account.create({
    data: {
      email: data.email,
      password: data.password,
      role: "STUDENT",
      student: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
          fees: {
            createMany: {
              data: [
                {
                  name: "Registration Fee",
                  amount: 100,
                  dateCreated: new Date(),
                  status: "PENDING"
                },
                {
                  name: "Miscellaneous Fee",
                  amount: 4975,
                  dateCreated: new Date(),
                  status: "PENDING"
                },
                {
                  name: "ID Fee",
                  amount: 200,
                  dateCreated: new Date(),
                  status: "PENDING"
                },
                {
                  name: "Books Fee",
                  amount: 1200,
                  dateCreated: new Date(),
                  status: "PENDING"
                },
              ]
            }
          }
        }
      }
    }
  })

  revalidatePath('/dashboard')
  return;
}

export async function getAllStudents() {
  const students = await prisma.student.findMany({
    include: { fees: true }
  })
  return students.map((student) => {
    let totalBalance = 0;

    student.fees.forEach((fee) => {
      if (fee.status === "PENDING")
        totalBalance = totalBalance + fee.amount
    })

    return { totalBalance, ...student }
  })
}

export async function getStudentById(id: number) {
  const student = await prisma.student.findUnique({ where: { id }, include: { fees: true } })

  if (!student) return null

  let totalBalance = 0;

  student.fees.forEach((fee) => {
    if (fee.status === "PENDING")
      totalBalance = totalBalance + fee.amount
  })

  return { totalBalance, ...student }
}

export async function updateAmount(feeId: number, amount: number, studentId: string) {
  await prisma.fee.update({
    where: { id: feeId },
    data: { amount }
  })

  revalidatePath(`/dashboard/${studentId}`)
}

export async function updateFeeTitle(feeId: number, title: string, studentId: string) {
  await prisma.fee.update({
    where: { id: feeId },
    data: { name: title }
  })

  revalidatePath(`/dashboard/${studentId}`)
}

export async function updateStudentName(studentId: number, data: { firstName: string, lastName: string }) {
  await prisma.student.update({
    where: { id: studentId },
    data: { firstName: data.firstName, lastName: data.lastName }
  })

  revalidatePath(`/dashboard/${studentId}`)
}

export async function deleteAccountByStudentId(studentId: number) {
  const studentAccount = await prisma.student.findUnique({
    where: { id: studentId },
    include: { account: true, fees: true }
  })

  await Promise.all(
    (studentAccount?.fees || []).map(fee =>
      prisma.payment.deleteMany({ where: { feeId: fee.id } })
    )
  );

  await prisma.fee.deleteMany({
    where: { StudentId: studentId }
  })

  await prisma.student.delete({
    where: { id: studentId }
  })

  await prisma.account.delete({
    where: { id: studentAccount?.account.id }
  })

  revalidatePath('/dashboard')
}

export async function deleteFee(feeId: number, studentId: string) {
  await prisma.payment.deleteMany({
    where: { feeId }
  })

  await prisma.fee.delete({
    where: { id: feeId }
  })

  revalidatePath(`/dashboard/${studentId}`)
}

export async function newFee(studentId: number, data: { name: string, amount: string }) {
  await prisma.fee.create({
    data: {
      StudentId: studentId,
      dateCreated: new Date(),
      amount: Number(data.amount),
      name: data.name,
      status: "PENDING"
    }
  })

  revalidatePath(`/dashboard/${studentId}`)
}

export async function signOut() {
  const cookie = await cookies()

  cookie.delete('accountId')
}
