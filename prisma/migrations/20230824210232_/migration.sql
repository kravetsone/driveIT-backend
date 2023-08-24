/*
  Warnings:

  - You are about to drop the column `tripId` on the `Ship` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_tripId_fkey";

-- AlterTable
ALTER TABLE "Ship" DROP COLUMN "tripId";

-- CreateTable
CREATE TABLE "_ShipToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShipToTrip_AB_unique" ON "_ShipToTrip"("A", "B");

-- CreateIndex
CREATE INDEX "_ShipToTrip_B_index" ON "_ShipToTrip"("B");

-- AddForeignKey
ALTER TABLE "_ShipToTrip" ADD CONSTRAINT "_ShipToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "Ship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShipToTrip" ADD CONSTRAINT "_ShipToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
