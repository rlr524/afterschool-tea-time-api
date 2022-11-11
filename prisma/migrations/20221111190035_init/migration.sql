-- CreateTable
CREATE TABLE "CustomerAccount" (
    "customerAccountID" TEXT NOT NULL,
    "customerAccountNumber" INTEGER NOT NULL,
    "customerLogin" TEXT NOT NULL,
    "customerPassword" TEXT NOT NULL,
    "customerBillingAddLn1" TEXT NOT NULL,
    "customerBillingAddLn2" TEXT,
    "customerBillingAddCity" TEXT NOT NULL,
    "customerBillingAddState" TEXT NOT NULL,
    "customerBillingAddZIP" TEXT NOT NULL,
    "customerAccountActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerAccount_pkey" PRIMARY KEY ("customerAccountID")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerID" TEXT NOT NULL,
    "customerLastName" VARCHAR(255) NOT NULL,
    "customerFirstName" VARCHAR(255) NOT NULL,
    "customerMiddleInitial" VARCHAR(1),
    "customerActive" BOOLEAN NOT NULL DEFAULT true,
    "accountID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerID")
);

-- CreateTable
CREATE TABLE "CustomerDetail" (
    "customerDetailID" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerShipAddLn1" TEXT NOT NULL,
    "customerShipAddLn2" TEXT,
    "customerShipAddCity" TEXT NOT NULL,
    "customerShipAddState" TEXT NOT NULL,
    "customerShipAddZIP" TEXT NOT NULL,
    "customerDOB" TIMESTAMP(3) NOT NULL,
    "customerCustomerID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDetail_pkey" PRIMARY KEY ("customerDetailID")
);

-- CreateTable
CREATE TABLE "Product" (
    "productID" TEXT NOT NULL,
    "productName" VARCHAR(255) NOT NULL,
    "productActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productVendorProductVendorID" TEXT,
    "productCategoryProductCategoryID" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productID")
);

-- CreateTable
CREATE TABLE "ProductDetail" (
    "productDetailID" TEXT NOT NULL,
    "productDescription" VARCHAR(255) NOT NULL,
    "productCost" DOUBLE PRECISION NOT NULL,
    "productRetail" DOUBLE PRECISION NOT NULL,
    "productSKU" TEXT NOT NULL,
    "productSizes" TEXT[],
    "productColors" TEXT[],
    "productFlavors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productProductID" TEXT NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("productDetailID")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productCategoryID" TEXT NOT NULL,
    "productCategoryName" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productCategoryID")
);

-- CreateTable
CREATE TABLE "ProductVendor" (
    "productVendorID" TEXT NOT NULL,
    "productVendorName" VARCHAR(255) NOT NULL,
    "productVendorEmail" TEXT NOT NULL,
    "productVendorPhone" TEXT NOT NULL,
    "productVendorAddLn1" TEXT NOT NULL,
    "productVendorAddLn2" TEXT,
    "productVendorAddCity" TEXT NOT NULL,
    "productVendorAddState" TEXT NOT NULL,
    "productVendorAddZIP" TEXT NOT NULL,
    "productVendorActive" BOOLEAN NOT NULL DEFAULT true,
    "productVendorTerms" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVendor_pkey" PRIMARY KEY ("productVendorID")
);

-- CreateTable
CREATE TABLE "SalesTransaction" (
    "transactionID" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "customerAccountCustomerAccountID" TEXT NOT NULL,
    "customerCustomerID" TEXT NOT NULL,
    "transactionVoid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesTransaction_pkey" PRIMARY KEY ("transactionID")
);

-- CreateTable
CREATE TABLE "CustomerFeedback" (
    "customerFeedbackID" TEXT NOT NULL,
    "customerFeedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerCustomerID" TEXT NOT NULL,

    CONSTRAINT "CustomerFeedback_pkey" PRIMARY KEY ("customerFeedbackID")
);

-- CreateTable
CREATE TABLE "_ProductToSalesTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_customerAccountNumber_key" ON "CustomerAccount"("customerAccountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_customerLogin_key" ON "CustomerAccount"("customerLogin");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSalesTransaction_AB_unique" ON "_ProductToSalesTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSalesTransaction_B_index" ON "_ProductToSalesTransaction"("B");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "CustomerAccount"("customerAccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDetail" ADD CONSTRAINT "CustomerDetail_customerCustomerID_fkey" FOREIGN KEY ("customerCustomerID") REFERENCES "Customer"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryProductCategoryID_fkey" FOREIGN KEY ("productCategoryProductCategoryID") REFERENCES "ProductCategory"("productCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productVendorProductVendorID_fkey" FOREIGN KEY ("productVendorProductVendorID") REFERENCES "ProductVendor"("productVendorID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_productProductID_fkey" FOREIGN KEY ("productProductID") REFERENCES "Product"("productID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesTransaction" ADD CONSTRAINT "SalesTransaction_customerAccountCustomerAccountID_fkey" FOREIGN KEY ("customerAccountCustomerAccountID") REFERENCES "CustomerAccount"("customerAccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesTransaction" ADD CONSTRAINT "SalesTransaction_customerCustomerID_fkey" FOREIGN KEY ("customerCustomerID") REFERENCES "Customer"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerFeedback" ADD CONSTRAINT "CustomerFeedback_customerCustomerID_fkey" FOREIGN KEY ("customerCustomerID") REFERENCES "Customer"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSalesTransaction" ADD CONSTRAINT "_ProductToSalesTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("productID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSalesTransaction" ADD CONSTRAINT "_ProductToSalesTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesTransaction"("transactionID") ON DELETE CASCADE ON UPDATE CASCADE;
