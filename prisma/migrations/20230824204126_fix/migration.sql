/*
  Warnings:

  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Trip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_tripId_fkey";

-- AlterTable
CREATE SEQUENCE trip_tripid_seq;
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
DROP COLUMN "id",
ALTER COLUMN "tripId" SET DEFAULT nextval('trip_tripid_seq'),
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripId");
ALTER SEQUENCE trip_tripid_seq OWNED BY "Trip"."tripId";

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("tripId") ON DELETE RESTRICT ON UPDATE CASCADE;
