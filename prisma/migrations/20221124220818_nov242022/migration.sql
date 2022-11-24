/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_accountID_fkey";

-- DropForeignKey
ALTER TABLE "CustomerDetail" DROP CONSTRAINT "CustomerDetail_customerCustomerID_fkey";

-- DropForeignKey
ALTER TABLE "CustomerFeedback" DROP CONSTRAINT "CustomerFeedback_customerCustomerID_fkey";

-- DropForeignKey
ALTER TABLE "SalesTransaction" DROP CONSTRAINT "SalesTransaction_customerCustomerID_fkey";

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "CustomerProfile" (
    "customerID" TEXT NOT NULL,
    "customerLastName" VARCHAR(255) NOT NULL,
    "customerFirstName" VARCHAR(255) NOT NULL,
    "customerMiddleInitial" VARCHAR(1),
    "customerActive" BOOLEAN NOT NULL DEFAULT true,
    "accountID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("customerID")
);

-- AddForeignKey
ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "CustomerAccount"("customerAccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDetail" ADD CONSTRAINT "CustomerDetail_customerCustomerID_fkey" FOREIGN KEY ("customerCustomerID") REFERENCES "CustomerProfile"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesTransaction" ADD CONSTRAINT "SalesTransaction_customerCustomerID_fkey" FOREIGN KEY ("customerCustomerID") REFERENCES "CustomerProfile"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerFeedback" ADD CONSTRAINT "CustomerFeedback_customerCustomerID_fkey" FOREIGN KEY ("customerCustomerID") REFERENCES "CustomerProfile"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;
