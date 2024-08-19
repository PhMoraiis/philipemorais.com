-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'DESENVOLVIMENTO', 'INTERROMPIDO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageMobile" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ONLINE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "techs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "techs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToTech" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "techs_name_key" ON "techs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTech_AB_unique" ON "_ProjectToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTech_B_index" ON "_ProjectToTech"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
