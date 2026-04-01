/*
  Warnings:

  - You are about to drop the column `eventId` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `role` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `location` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverImageUrl` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Gallery` DROP FOREIGN KEY `Gallery_eventId_fkey`;

-- DropIndex
DROP INDEX `Gallery_eventId_fkey` ON `Gallery`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `role` VARCHAR(191) NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL,
    MODIFY `coverImageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Gallery` DROP COLUMN `eventId`;
