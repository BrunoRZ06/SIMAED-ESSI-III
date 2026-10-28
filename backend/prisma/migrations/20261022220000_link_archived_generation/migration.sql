ALTER TABLE "GeneratedQuestion"
ADD COLUMN "sourceArchivedQuestionId" TEXT;

CREATE INDEX "GeneratedQuestion_sourceArchivedQuestionId_idx"
ON "GeneratedQuestion"("sourceArchivedQuestionId");

ALTER TABLE "GeneratedQuestion"
ADD CONSTRAINT "GeneratedQuestion_sourceArchivedQuestionId_fkey"
FOREIGN KEY ("sourceArchivedQuestionId")
REFERENCES "ArchivedQuestion"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;
