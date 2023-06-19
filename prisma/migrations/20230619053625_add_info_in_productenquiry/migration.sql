-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `title` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductEnquiry` ADD COLUMN `info` JSON NULL;
