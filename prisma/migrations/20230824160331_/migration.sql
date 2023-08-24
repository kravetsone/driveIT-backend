/*
  Warnings:

  - The primary key for the `Stop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `loaction_type` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `parent_station` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `platform_code` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `stop_id` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `stop_lat` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `stop_lon` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `stop_name` on the `Stop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Stop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationType` to the `Stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `Stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformCode` to the `Stop` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Stop_stop_id_key";

-- AlterTable
ALTER TABLE "Stop" DROP CONSTRAINT "Stop_pkey",
DROP COLUMN "loaction_type",
DROP COLUMN "parent_station",
DROP COLUMN "platform_code",
DROP COLUMN "stop_id",
DROP COLUMN "stop_lat",
DROP COLUMN "stop_lon",
DROP COLUMN "stop_name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locationType" INTEGER NOT NULL,
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentStation" TEXT,
ADD COLUMN     "platformCode" TEXT NOT NULL,
ADD CONSTRAINT "Stop_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stop_id_key" ON "Stop"("id");
