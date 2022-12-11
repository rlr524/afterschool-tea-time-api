/*
  Warnings:

  - You are about to drop the column `productColors` on the `ProductDetail` table. All the data in the column will be lost.
  - You are about to drop the column `productFlavors` on the `ProductDetail` table. All the data in the column will be lost.
  - You are about to drop the column `productSizes` on the `ProductDetail` table. All the data in the column will be lost.
  - You are about to drop the `CustomerDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerEmail` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerFirstName` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLastName` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddCity` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddLn1` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddState` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddZIP` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddCity` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddLn1` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddState` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerShipAddZIP` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productProductID` to the `CustomerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productColor` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productEndDate` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productFlavor` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSize` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productStartDate` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomerDetail" DROP CONSTRAINT "CustomerDetail_customerCustomerID_fkey";

-- AlterTable
ALTER TABLE "CustomerAccount" ADD COLUMN     "customerDOB" TEXT,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerFirstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "customerLastName" VARCHAR(255) NOT NULL,
ADD COLUMN     "customerMiddleInitial" VARCHAR(1),
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "customerShipAddCity" TEXT NOT NULL,
ADD COLUMN     "customerShipAddLn1" TEXT NOT NULL,
ADD COLUMN     "customerShipAddLn2" TEXT,
ADD COLUMN     "customerShipAddState" TEXT NOT NULL,
ADD COLUMN     "customerShipAddZIP" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CustomerProfile" ADD COLUMN     "customerDOB" TEXT,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "customerShipAddCity" TEXT NOT NULL,
ADD COLUMN     "customerShipAddLn1" TEXT NOT NULL,
ADD COLUMN     "customerShipAddLn2" TEXT,
ADD COLUMN     "customerShipAddState" TEXT NOT NULL,
ADD COLUMN     "customerShipAddZIP" TEXT NOT NULL,
ADD COLUMN     "productProductID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "customerProfileCustomerID" TEXT;

-- AlterTable
ALTER TABLE "ProductDetail" DROP COLUMN "productColors",
DROP COLUMN "productFlavors",
DROP COLUMN "productSizes",
ADD COLUMN     "productColor" TEXT NOT NULL,
ADD COLUMN     "productDetailActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "productEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productFlavor" TEXT NOT NULL,
ADD COLUMN     "productSaleFlag" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "productSaleRetail" DOUBLE PRECISION,
ADD COLUMN     "productSize" TEXT NOT NULL,
ADD COLUMN     "productStartDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "CustomerDetail";

-- CreateTable
CREATE TABLE "UserAccount" (
    "userAccountID" TEXT NOT NULL,
    "userAccountLogin" TEXT NOT NULL,
    "userAccountPassword" TEXT NOT NULL,
    "userAccountLevel" TEXT NOT NULL DEFAULT 'CUSTSERV',
    "userAccountEmail" TEXT NOT NULL,
    "userAccountActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("userAccountID")
);

-- CreateTable
CREATE TABLE "ProductInventory" (
    "inventoryID" TEXT NOT NULL,
    "countOnHand" INTEGER NOT NULL,
    "productDetailProductDetailID" TEXT NOT NULL,

    CONSTRAINT "ProductInventory_pkey" PRIMARY KEY ("inventoryID")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "productOrderID" TEXT NOT NULL,
    "poNumber" TEXT NOT NULL,
    "productDetailProductDetailID" TEXT NOT NULL,
    "poExtendedCost" DOUBLE PRECISION NOT NULL,
    "poExtendedRetail" DOUBLE PRECISION NOT NULL,
    "poFreight" DOUBLE PRECISION NOT NULL,
    "poDiscount" DOUBLE PRECISION NOT NULL,
    "userAccountUserAccountID" TEXT NOT NULL,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("productOrderID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_userAccountLogin_key" ON "UserAccount"("userAccountLogin");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_customerProfileCustomerID_fkey" FOREIGN KEY ("customerProfileCustomerID") REFERENCES "CustomerProfile"("customerID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInventory" ADD CONSTRAINT "ProductInventory_productDetailProductDetailID_fkey" FOREIGN KEY ("productDetailProductDetailID") REFERENCES "ProductDetail"("productDetailID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_productDetailProductDetailID_fkey" FOREIGN KEY ("productDetailProductDetailID") REFERENCES "ProductDetail"("productDetailID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_userAccountUserAccountID_fkey" FOREIGN KEY ("userAccountUserAccountID") REFERENCES "UserAccount"("userAccountID") ON DELETE RESTRICT ON UPDATE CASCADE;
