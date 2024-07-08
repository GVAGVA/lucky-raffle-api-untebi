-- DropForeignKey
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_winnerId_fkey";

-- AlterTable
ALTER TABLE "Prize" ALTER COLUMN "winnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
