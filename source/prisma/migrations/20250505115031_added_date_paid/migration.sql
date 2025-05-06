/*
  Warnings:

  - Added the required column `datePaid` to the `Fee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fee" ADD COLUMN     "datePaid" TIMESTAMP(3) NOT NULL;
