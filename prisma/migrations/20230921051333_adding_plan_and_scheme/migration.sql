/*
  Warnings:

  - You are about to drop the column `subject` on the `Leads` table. All the data in the column will be lost.
  - Added the required column `schemeId` to the `Leads` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Leads" DROP COLUMN "subject",
ADD COLUMN     "schemeId" INTEGER NOT NULL,
ADD COLUMN     "status" "LeadStatus" NOT NULL DEFAULT 'OPEN';

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "order" SERIAL NOT NULL,
    "price" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "price" TEXT,
    "order" SERIAL NOT NULL,
    "planId" INTEGER,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scheme" ADD CONSTRAINT "Scheme_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leads" ADD CONSTRAINT "Leads_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
