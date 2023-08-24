/*
  Warnings:

  - The primary key for the `Agency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `agency_id` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `agency_lang` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `agency_name` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `agency_timezone` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `agency_url` on the `Agency` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Agency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Agency_agency_id_key";

-- AlterTable
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_pkey",
DROP COLUMN "agency_id",
DROP COLUMN "agency_lang",
DROP COLUMN "agency_name",
DROP COLUMN "agency_timezone",
DROP COLUMN "agency_url",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lang" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "Agency_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_id_key" ON "Agency"("id");
