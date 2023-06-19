/*
  Warnings:

  - You are about to drop the column `info` on the `ProductEnquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `info` JSON NULL;

-- AlterTable
ALTER TABLE `ProductEnquiry` DROP COLUMN `info`;
