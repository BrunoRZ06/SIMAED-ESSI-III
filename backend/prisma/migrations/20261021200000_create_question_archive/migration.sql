CREATE TYPE "ArchiveReviewStatus" AS ENUM ('NEEDS_REVIEW', 'REVIEWED');

CREATE TABLE "ArchivedQuestionSource" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "bookletCode" TEXT NOT NULL,
    "stageCode" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "sourceNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ArchivedQuestionSource_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ArchivedQuestion" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "itemCode" TEXT NOT NULL,
    "disciplineCode" TEXT NOT NULL,
    "descriptorCode" TEXT,
    "statement" TEXT NOT NULL,
    "stimulusText" TEXT,
    "stimulusAssetPath" TEXT,
    "stimulusAltText" TEXT,
    "pdfPageNumber" INTEGER NOT NULL,
    "correctAlternative" TEXT,
    "answerSource" TEXT,
    "reviewStatus" "ArchiveReviewStatus" NOT NULL DEFAULT 'NEEDS_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ArchivedQuestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ArchivedQuestionAlternative" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArchivedQuestionAlternative_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ArchivedQuestionSource_code_key" ON "ArchivedQuestionSource"("code");
CREATE UNIQUE INDEX "ArchivedQuestionSource_year_bookletCode_stageCode_key" ON "ArchivedQuestionSource"("year", "bookletCode", "stageCode");
CREATE UNIQUE INDEX "ArchivedQuestion_sourceId_number_key" ON "ArchivedQuestion"("sourceId", "number");
CREATE INDEX "ArchivedQuestion_disciplineCode_descriptorCode_reviewStatus_idx" ON "ArchivedQuestion"("disciplineCode", "descriptorCode", "reviewStatus");
CREATE INDEX "ArchivedQuestion_sourceId_pdfPageNumber_idx" ON "ArchivedQuestion"("sourceId", "pdfPageNumber");
CREATE UNIQUE INDEX "ArchivedQuestionAlternative_questionId_label_key" ON "ArchivedQuestionAlternative"("questionId", "label");

ALTER TABLE "ArchivedQuestion" ADD CONSTRAINT "ArchivedQuestion_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ArchivedQuestionSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ArchivedQuestionAlternative" ADD CONSTRAINT "ArchivedQuestionAlternative_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ArchivedQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
