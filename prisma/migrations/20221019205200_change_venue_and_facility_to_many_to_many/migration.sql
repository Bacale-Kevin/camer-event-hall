/*
  Warnings:

  - You are about to drop the column `venueId` on the `facilities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "facilities" DROP CONSTRAINT "facilities_venueId_fkey";

-- AlterTable
ALTER TABLE "facilities" DROP COLUMN "venueId";

-- CreateTable
CREATE TABLE "_FacilityToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToVenue_AB_unique" ON "_FacilityToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToVenue_B_index" ON "_FacilityToVenue"("B");

-- AddForeignKey
ALTER TABLE "_FacilityToVenue" ADD CONSTRAINT "_FacilityToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToVenue" ADD CONSTRAINT "_FacilityToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
