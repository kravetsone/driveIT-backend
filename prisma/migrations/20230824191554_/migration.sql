/*
  Warnings:

  - You are about to drop the column `monday` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `isMonday` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "monday",
ADD COLUMN     "isMonday" BOOLEAN NOT NULL;
