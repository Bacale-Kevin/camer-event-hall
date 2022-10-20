/*
  Warnings:

  - You are about to drop the `_FacilityToVenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FacilityToVenue" DROP CONSTRAINT "_FacilityToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_FacilityToVenue" DROP CONSTRAINT "_FacilityToVenue_B_fkey";

-- AlterTable
ALTER TABLE "facilities" ADD COLUMN     "venueId" TEXT;

-- DropTable
DROP TABLE "_FacilityToVenue";

-- AddForeignKey
ALTER TABLE "facilities" ADD CONSTRAINT "facilities_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;
