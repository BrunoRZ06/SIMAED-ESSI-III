/*
  Warnings:

  - Added the required column `configHash` to the `MockExamGenerationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `MockExamGenerationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplineCode` to the `MockExamGenerationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionCount` to the `MockExamGenerationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionType` to the `MockExamGenerationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageCode` to the `MockExamGenerationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MockExamGenerationRequest" ADD COLUMN     "configHash" TEXT NOT NULL,
ADD COLUMN     "descriptorIds" TEXT[],
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "disciplineCode" TEXT NOT NULL,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "questionCount" INTEGER NOT NULL,
ADD COLUMN     "questionType" TEXT NOT NULL,
ADD COLUMN     "stageCode" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "MockExamGenerationRequest_configHash_createdAt_idx" ON "MockExamGenerationRequest"("configHash", "createdAt");

-- CreateIndex
CREATE INDEX "MockExamGenerationRequest_status_idx" ON "MockExamGenerationRequest"("status");
