/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "ReferenceMatrix" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferenceMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Descriptor" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "matrixId" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,

    CONSTRAINT "Descriptor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceMatrix_name_year_type_key" ON "ReferenceMatrix"("name", "year", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_code_key" ON "Stage"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_name_key" ON "Discipline"("name");

-- CreateIndex
CREATE INDEX "Descriptor_stageId_disciplineId_idx" ON "Descriptor"("stageId", "disciplineId");

-- CreateIndex
CREATE UNIQUE INDEX "Descriptor_matrixId_stageId_disciplineId_code_key" ON "Descriptor"("matrixId", "stageId", "disciplineId", "code");

-- AddForeignKey
ALTER TABLE "Descriptor" ADD CONSTRAINT "Descriptor_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "ReferenceMatrix"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Descriptor" ADD CONSTRAINT "Descriptor_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Descriptor" ADD CONSTRAINT "Descriptor_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
