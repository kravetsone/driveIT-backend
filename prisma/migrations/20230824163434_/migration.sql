/*
  Warnings:

  - You are about to drop the column `routeLongName` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `routeUrl` on the `Route` table. All the data in the column will be lost.
  - Added the required column `LongName` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "routeLongName",
DROP COLUMN "routeUrl",
ADD COLUMN     "LongName" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
