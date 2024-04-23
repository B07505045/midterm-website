-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorIcon" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "authorName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "icon" TEXT NOT NULL DEFAULT '';
