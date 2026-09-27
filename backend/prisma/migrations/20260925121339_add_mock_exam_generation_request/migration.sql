-- CreateTable
CREATE TABLE "MockExamGenerationRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MockExamGenerationRequest_pkey" PRIMARY KEY ("id")
);
