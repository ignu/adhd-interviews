-- CreateEnum
CREATE TYPE "BehavioralQuestionCategory" AS ENUM ('ACTION_ORIENTED', 'ADAPTIVE', 'COMMUNICATION', 'CONFLICT', 'CREATIVITY', 'DECISION_MAKING', 'HANDLING_PRESSURE', 'PROBLEM_SOLVING', 'TEAMWORK');

-- CreateTable
CREATE TABLE "UserExample" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "UserExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehavorialQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "category" "BehavioralQuestionCategory" NOT NULL,
    "common" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BehavorialQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExample_email_key" ON "UserExample"("email");
