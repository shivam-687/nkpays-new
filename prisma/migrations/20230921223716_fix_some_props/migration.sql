-- DropForeignKey
ALTER TABLE "Scheme" DROP CONSTRAINT "Scheme_planId_fkey";

-- AlterTable
ALTER TABLE "Leads" ADD COLUMN     "pincode" TEXT;

-- AddForeignKey
ALTER TABLE "Scheme" ADD CONSTRAINT "Scheme_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
