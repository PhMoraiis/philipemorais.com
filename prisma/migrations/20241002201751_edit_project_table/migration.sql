/*
  Warnings:

  - You are about to drop the column `image` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `imageDark` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `imageDarkMobile` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `imageMobile` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `translatedDescription` on the `projects` table. All the data in the column will be lost.
  - Added the required column `title` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "image",
DROP COLUMN "imageDark",
DROP COLUMN "imageDarkMobile",
DROP COLUMN "imageMobile",
DROP COLUMN "name",
DROP COLUMN "translatedDescription",
ADD COLUMN     "imagesDektop" TEXT[],
ADD COLUMN     "imagesMobile" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;
