import prisma from "../db";

/**
 * @param req
 * @param res
 * @description - Get all of a customer's favorite products
 */
export const getFavoriteProducts = async (req, res) => {
	const customer = await prisma.customerProfile.findUnique({
		where: {
			customerID: req.customer.customerID,
		},
		include: {
			favorites: true,
		},
	});

	res.json({ data: customer.favorites });
};

/**
 * @param req
 * @param res
 * @description - Get all products that are flagged as active. The UI will filter the products based on customer applied filters as needed
 */
export const getAllProducts = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			productActive: true,
		},
	});
	res.json({ data: products });
};

/**
 * @param req
 * @param res
 * @description - Get one product based on the /product/:id route parameter
 */
export const getOneProduct = async (req, res) => {
	const productID = req.params.id;
	const product = await prisma.product.findUnique({
		where: {
			productID,
		},
	});
	res.json({ data: product });
};

export const createProduct = async (req, res) => {
	const product = await prisma.product.create({
		data: {
			productName: req.body.productname,
			productVendor: req.body.productvendor,
			productCategory: req.body.productcategory,
		},
	});

	res.json({ data: product });
};

export const updateProduct = async (req, res) => {
	const productID = req.params.id;
	const updatedProduct = await prisma.product.update({
		where: {
			productID,
		},
		data: {
			productName: req.body.productname,
			productVendor: req.body.productvendor,
			productCategory: req.body.productcategory,
			productActive: req.body.productactive,
		},
	});

	res.json({ data: updatedProduct });
};

export const deleteProduct = async (req, res) => {
	const productID = req.params.id;
	const deletedProduct = await prisma.product.update({
		where: {
			productID,
		},
		data: {
			productActive: false,
		},
	});

	res.json({ data: deletedProduct });
};
