/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `MockExamGenerationRequest` will be added. If there are existing duplicate values, this will fail.
  - The required column `requestId` was added to the `MockExamGenerationRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MockExamGenerationRequest" ADD COLUMN     "requestId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MockExamGenerationRequest_requestId_key" ON "MockExamGenerationRequest"("requestId");
