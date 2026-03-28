/*
  Warnings:

  - You are about to drop the column `compledAt` on the `Execution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Execution" DROP COLUMN "compledAt",
ADD COLUMN     "completdAt" TIMESTAMP(3);
