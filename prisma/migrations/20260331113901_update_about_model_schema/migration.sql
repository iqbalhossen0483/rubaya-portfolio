/*
  Warnings:

  - You are about to drop the column `content` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Hero` table. All the data in the column will be lost.
  - Added the required column `description` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `philosophy` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `About` DROP COLUMN `content`,
    DROP COLUMN `resumeUrl`,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `philosophy` TEXT NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hero` DROP COLUMN `imageUrl`,
    ADD COLUMN `award` VARCHAR(191) NULL,
    ADD COLUMN `countries` VARCHAR(191) NULL,
    ADD COLUMN `profile` VARCHAR(191) NULL,
    ADD COLUMN `yearsOfExperience` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HighlightedPosition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `aboutId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `aboutId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HighlightedPosition` ADD CONSTRAINT `HighlightedPosition_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `About`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `About`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
