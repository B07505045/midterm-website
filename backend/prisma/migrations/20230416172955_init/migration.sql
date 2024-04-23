/*
  Warnings:

  - You are about to drop the column `format` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "format",
DROP COLUMN "publicId",
DROP COLUMN "version",
ALTER COLUMN "name" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
