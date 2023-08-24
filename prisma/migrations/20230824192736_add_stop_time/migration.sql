/*
  Warnings:

  - The primary key for the `Calendar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Calendar_serviceId_key";

-- AlterTable
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "StopTime" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "stopId" TEXT NOT NULL,
    "stopSequence" INTEGER NOT NULL,
    "stopHeadsign" TEXT NOT NULL,

    CONSTRAINT "StopTime_pkey" PRIMARY KEY ("id")
);
