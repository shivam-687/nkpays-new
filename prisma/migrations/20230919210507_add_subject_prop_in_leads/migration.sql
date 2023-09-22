/*
  Warnings:

  - Added the required column `subject` to the `Leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leads" ADD COLUMN     "subject" TEXT NOT NULL;
