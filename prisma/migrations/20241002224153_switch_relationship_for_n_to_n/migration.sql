/*
  Warnings:

  - You are about to drop the column `projectId` on the `techs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "techs" DROP CONSTRAINT "techs_projectId_fkey";

-- AlterTable
ALTER TABLE "techs" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "_ProjectToTech" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTech_AB_unique" ON "_ProjectToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTech_B_index" ON "_ProjectToTech"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
