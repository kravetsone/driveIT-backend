/*
  Warnings:

  - The primary key for the `Route` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `agency_id` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `route_id` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `route_long_name` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `route_short_name` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `route_type` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `route_url` on the `Route` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Route` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agencyId` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeLongName` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeUrl` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortName` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Route_route_id_key";

-- AlterTable
ALTER TABLE "Route" DROP CONSTRAINT "Route_pkey",
DROP COLUMN "agency_id",
DROP COLUMN "route_id",
DROP COLUMN "route_long_name",
DROP COLUMN "route_short_name",
DROP COLUMN "route_type",
DROP COLUMN "route_url",
ADD COLUMN     "agencyId" TEXT NOT NULL,
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "routeLongName" TEXT NOT NULL,
ADD COLUMN     "routeUrl" TEXT NOT NULL,
ADD COLUMN     "shortName" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD CONSTRAINT "Route_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Route_id_key" ON "Route"("id");
