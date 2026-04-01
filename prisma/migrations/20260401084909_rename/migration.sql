/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `image` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Made the column `caption` on table `Gallery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Gallery` DROP COLUMN `imageUrl`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `caption` VARCHAR(191) NOT NULL;
