-- AlterEnum
ALTER TYPE "LeadStatus" ADD VALUE 'DECLINED';

-- DropForeignKey
ALTER TABLE "Leads" DROP CONSTRAINT "Leads_schemeId_fkey";

-- AlterTable
ALTER TABLE "Leads" ADD COLUMN     "planId" INTEGER,
ALTER COLUMN "schemeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Scheme" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Leads" ADD CONSTRAINT "Leads_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leads" ADD CONSTRAINT "Leads_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
