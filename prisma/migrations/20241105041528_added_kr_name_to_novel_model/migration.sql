/*
  Warnings:

  - Added the required column `kr_name` to the `Novel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Novel" ADD COLUMN     "kr_name" TEXT NOT NULL;
