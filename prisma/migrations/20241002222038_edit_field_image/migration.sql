/*
  Warnings:

  - You are about to drop the column `imagesDektop` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "imagesDektop",
ADD COLUMN     "imagesDesktop" TEXT[];
