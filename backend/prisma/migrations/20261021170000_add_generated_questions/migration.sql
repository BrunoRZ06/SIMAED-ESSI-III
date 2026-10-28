-- CreateTable
CREATE TABLE "GeneratedQuestion" (
    "id" TEXT NOT NULL,
    "generationRequestId" TEXT NOT NULL,
    "descriptorId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "statement" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "questionType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GeneratedQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedQuestionAlternative" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GeneratedQuestionAlternative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedQuestion_generationRequestId_position_key" ON "GeneratedQuestion"("generationRequestId", "position");
CREATE INDEX "GeneratedQuestion_descriptorId_idx" ON "GeneratedQuestion"("descriptorId");
CREATE UNIQUE INDEX "GeneratedQuestionAlternative_questionId_label_key" ON "GeneratedQuestionAlternative"("questionId", "label");

-- AddForeignKey
ALTER TABLE "GeneratedQuestion" ADD CONSTRAINT "GeneratedQuestion_generationRequestId_fkey" FOREIGN KEY ("generationRequestId") REFERENCES "MockExamGenerationRequest"("requestId") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GeneratedQuestion" ADD CONSTRAINT "GeneratedQuestion_descriptorId_fkey" FOREIGN KEY ("descriptorId") REFERENCES "Descriptor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "GeneratedQuestionAlternative" ADD CONSTRAINT "GeneratedQuestionAlternative_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "GeneratedQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
