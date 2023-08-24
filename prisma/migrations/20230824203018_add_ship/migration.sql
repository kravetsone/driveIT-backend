-- CreateTable
CREATE TABLE "Ship" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ship_id_key" ON "Ship"("id");
