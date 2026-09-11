/*
  Warnings:

  - You are about to drop the column `type` on the `ReferenceMatrix` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Discipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `ReferenceMatrix` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Stage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `ReferenceMatrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluationType` to the `ReferenceMatrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ReferenceMatrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ReferenceMatrix_name_year_type_key";

-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReferenceMatrix" DROP COLUMN "type",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "evaluationType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_code_key" ON "Discipline"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceMatrix_code_key" ON "ReferenceMatrix"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_name_key" ON "Stage"("name");
