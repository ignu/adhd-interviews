-- AlterTable
ALTER TABLE "BehavioralQuestionAnswer" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showUserName" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "BehavioralQuestionAnswer_userId_idx" ON "BehavioralQuestionAnswer"("userId");

-- CreateIndex
CREATE INDEX "BehavioralQuestionAnswer_behavioralQuestionId_idx" ON "BehavioralQuestionAnswer"("behavioralQuestionId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

