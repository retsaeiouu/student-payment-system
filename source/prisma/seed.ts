import { PrismaClient, Prisma } from '../generated/prisma'

const prisma = new PrismaClient()

const admin: Prisma.AccountCreateInput = {
  email: 'admin@gmail.com',
  password: 'admin',
  role: 'ADMIN'
}

export async function main() {
  await prisma.account.create({ data: admin })
}

main()
