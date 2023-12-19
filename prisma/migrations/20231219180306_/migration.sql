/*
  Warnings:

  - You are about to drop the column `shopId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shopName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "shopId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "shopId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "datePosted" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "promotionDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "shopName" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Shop";

-- CreateIndex
CREATE UNIQUE INDEX "User_shopName_key" ON "User"("shopName");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
