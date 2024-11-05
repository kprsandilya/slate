/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Novel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kr_name]` on the table `Novel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image]` on the table `Novel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Novel_name_key" ON "Novel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Novel_kr_name_key" ON "Novel"("kr_name");

-- CreateIndex
CREATE UNIQUE INDEX "Novel_image_key" ON "Novel"("image");
