/*
  Warnings:

  - You are about to drop the column `fio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fio",
DROP COLUMN "role";

-- DropEnum
DROP TYPE "UserRole";
