/*
  Warnings:

  - You are about to drop the column `friday` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `saturday` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `sunday` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `thursday` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `tuesday` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `wednesday` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `isFriday` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSaturday` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSunday` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isThursday` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTuesday` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isWednesday` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "friday",
DROP COLUMN "saturday",
DROP COLUMN "sunday",
DROP COLUMN "thursday",
DROP COLUMN "tuesday",
DROP COLUMN "wednesday",
ADD COLUMN     "isFriday" BOOLEAN NOT NULL,
ADD COLUMN     "isSaturday" BOOLEAN NOT NULL,
ADD COLUMN     "isSunday" BOOLEAN NOT NULL,
ADD COLUMN     "isThursday" BOOLEAN NOT NULL,
ADD COLUMN     "isTuesday" BOOLEAN NOT NULL,
ADD COLUMN     "isWednesday" BOOLEAN NOT NULL;
