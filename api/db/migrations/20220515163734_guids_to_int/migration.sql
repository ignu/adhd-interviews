/*
  Warnings:

  - The primary key for the `BehavioralQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BehavioralQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BehavioralQuestionAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BehavioralQuestionAnswer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `behavioralQuestionId` on the `BehavioralQuestionAnswer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BehavioralQuestionAnswer" DROP CONSTRAINT "BehavioralQuestionAnswer_behavioralQuestionId_fkey";

-- AlterTable
ALTER TABLE "BehavioralQuestion" DROP CONSTRAINT "BehavioralQuestion_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BehavioralQuestion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BehavioralQuestionAnswer" DROP CONSTRAINT "BehavioralQuestionAnswer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "behavioralQuestionId",
ADD COLUMN     "behavioralQuestionId" INTEGER NOT NULL,
ADD CONSTRAINT "BehavioralQuestionAnswer_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "BehavioralQuestionAnswer_behavioralQuestionId_idx" ON "BehavioralQuestionAnswer"("behavioralQuestionId");

-- AddForeignKey
ALTER TABLE "BehavioralQuestionAnswer" ADD CONSTRAINT "BehavioralQuestionAnswer_behavioralQuestionId_fkey" FOREIGN KEY ("behavioralQuestionId") REFERENCES "BehavioralQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
