/*
  Warnings:

  - You are about to drop the column `icon` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "icon",
ADD COLUMN     "format" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publicId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "version" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_publicId_key" ON "User"("publicId");
