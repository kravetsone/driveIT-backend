-- DropForeignKey
ALTER TABLE "StopTime" DROP CONSTRAINT "StopTime_stopId_fkey";

-- DropForeignKey
ALTER TABLE "StopTime" DROP CONSTRAINT "StopTime_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_routeId_fkey";

-- AddForeignKey
ALTER TABLE "StopTime" ADD CONSTRAINT "StopTime_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopTime" ADD CONSTRAINT "StopTime_stopId_fkey" FOREIGN KEY ("stopId") REFERENCES "Stop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
