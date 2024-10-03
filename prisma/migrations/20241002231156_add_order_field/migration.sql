/*
  Warnings:

  - Added the required column `order` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `techs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "techs" ADD COLUMN     "order" INTEGER NOT NULL;
