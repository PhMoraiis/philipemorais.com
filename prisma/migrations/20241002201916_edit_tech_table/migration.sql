/*
  Warnings:

  - You are about to drop the column `icon` on the `techs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "techs" DROP COLUMN "icon",
ADD COLUMN     "image" TEXT;
