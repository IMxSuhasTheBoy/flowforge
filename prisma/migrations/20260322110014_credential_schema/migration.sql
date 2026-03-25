/*
  Warnings:

  - You are about to drop the column `Value` on the `Credential` table. All the data in the column will be lost.
  - Added the required column `value` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "Value",
ADD COLUMN     "value" TEXT NOT NULL;
