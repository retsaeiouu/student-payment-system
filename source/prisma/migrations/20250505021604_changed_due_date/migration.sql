/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Fee` table. All the data in the column will be lost.
  - Added the required column `dateCreated` to the `Fee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fee" DROP COLUMN "dueDate",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL;
