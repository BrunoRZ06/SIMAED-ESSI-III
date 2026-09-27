-- CreateEnum
CREATE TYPE "GenerationStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "MockExamGenerationRequest" ADD COLUMN     "status" "GenerationStatus" NOT NULL DEFAULT 'PENDING';
