/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL;

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "agency_id" TEXT NOT NULL,
    "agency_name" TEXT NOT NULL,
    "agency_url" TEXT NOT NULL,
    "agency_timezone" TEXT NOT NULL,
    "agency_lang" TEXT NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" SERIAL NOT NULL,
    "stop_id" TEXT NOT NULL,
    "stop_name" TEXT NOT NULL,
    "stop_lat" DOUBLE PRECISION NOT NULL,
    "stop_lon" DOUBLE PRECISION NOT NULL,
    "loaction_type" INTEGER NOT NULL,
    "parent_station" TEXT,
    "platform_code" TEXT NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_agency_id_key" ON "Agency"("agency_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stop_stop_id_key" ON "Stop"("stop_id");
