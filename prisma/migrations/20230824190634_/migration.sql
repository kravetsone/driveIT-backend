/*
  Warnings:

  - The primary key for the `Calendar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `end_date` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Calendar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Calendar_service_id_key";

-- AlterTable
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_pkey",
DROP COLUMN "end_date",
DROP COLUMN "service_id",
DROP COLUMN "start_date",
ADD COLUMN     "endDate" INTEGER NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "startDate" INTEGER NOT NULL,
ADD CONSTRAINT "Calendar_pkey" PRIMARY KEY ("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_serviceId_key" ON "Calendar"("serviceId");
