/*
  Warnings:

  - The primary key for the `Agency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Agency` table. All the data in the column will be lost.
  - The primary key for the `Stop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Stop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Agency_pkey" PRIMARY KEY ("agency_id");

-- AlterTable
ALTER TABLE "Stop" DROP CONSTRAINT "Stop_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Stop_pkey" PRIMARY KEY ("stop_id");

-- CreateTable
CREATE TABLE "Route" (
    "route_id" INTEGER NOT NULL,
    "agency_id" TEXT NOT NULL,
    "route_short_name" TEXT NOT NULL,
    "route_long_name" TEXT NOT NULL,
    "route_type" INTEGER NOT NULL,
    "route_url" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("route_id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "service_id" TEXT NOT NULL,
    "monday" INTEGER NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL,
    "start_date" INTEGER NOT NULL,
    "end_date" INTEGER NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("service_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_route_id_key" ON "Route"("route_id");

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_service_id_key" ON "Calendar"("service_id");
