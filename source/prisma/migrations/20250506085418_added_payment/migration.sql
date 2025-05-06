/*
  Warnings:

  - You are about to drop the column `datePaid` on the `Fee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fee" DROP COLUMN "datePaid";

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "feeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
