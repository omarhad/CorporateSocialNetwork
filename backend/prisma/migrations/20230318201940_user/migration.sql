/*
  Warnings:

  - Made the column `birthdate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "birthdate" SET NOT NULL,
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;
