import { handleInputErrors } from "./../../middleware";
import { updateCustomerAccount } from "./../../handlers/customer";
import {
	createProduct,
	updateProduct,
	deleteProduct,
	getFavoriteProducts,
	createProductCategory,
	createProductVendor,
} from "./../../handlers/product";
import { Router } from "express";
import { body } from "express-validator";

const r = Router();

/**
 * Account vs Customer
 * The /account routes reference the CustomerAccount table and are required for shopping on HTT. Creating a
 * customer account via the POST /account route (in server.ts as it's not a protected route) creates an account
 * and a customer profile, so creates entries in the CustomerAccount and CustomerProfile tables.
 * The /customer routes reference the CustomerProfile table and are additional shopper
 * profiles linked to a single customer account (think Netflix profiles...the account must be signed into in order
 * to access any of what can be multiple profiles under the account) in that they all sign in with the same
 * login and password, but have their own shopping profiles including limits that can be managed only by the
 * account owner with a specific PIN. This allows, for example, parents to allow college aged children to
 * make purchases while away at school on the parent's account and, persuant to controls set by the account owner,
 * allow those purchases to be charged to the account owner's billing info or require the profile holder to use
 * separate billing info.
 */

/**
 * @description - Sensei user product routes
 */

// Available only to Sensei users ADMIN, PRODMGMT
r.put(
	"/product/:id",
	body(["productname", "productvendor", "productcategory"]).isString(),
	handleInputErrors,
	updateProduct
);
// Available only to Sensei users ADMIN, PRODMGMT
r.post(
	"/product",
	body(["productname"]).isString(),
	handleInputErrors,
	createProduct
);
// Available only to Sensei users ADMIN, PRODMGMT
r.delete("/product/:id", deleteProduct);

/**
 * @description - Sensei user product category routes
 */

// Available only to Sensei users ADMIN, PRODMGMT
r.post(
	"/product-category",
	body(["productcategoryname"]).isString(),
	handleInputErrors,
	createProductCategory
);

/**
 * @description - Sensei user product vendor routes
 */

// Available only to Sensei users ADMIN, PRODMGMT
r.post(
	"/product-vendor",
	body([
		"productvendorname",
		"productvendoremail",
		"productvendorphone",
		"productvendoraddln1",
		"productvendoraddln2",
		"productvendoraddcity",
		"productvenddoraddstate",
		"productvendoraddzip",
		"productvendorterms",
	]).isString(),
	handleInputErrors,
	createProductVendor
);

/**
 * @description - All customer profile routes
 */

// Available only to Sensei users ADMIN, CUSTSERV
r.get("/customer", () => {
	//
});
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.get("/customer/:id", () => {
	//
});
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.put(
	"/customer/:id",
	body([
		"lastname",
		"firstname",
		"middleinitial",
		"email",
		"customerPhone",
		"customerShipAddLn1",
		"customerShipAddLn2",
		"customerShipAddCity",
		"customerShipAddState",
		"customerShipAddZIP",
		"customerDOB",
	]).isString(),
	handleInputErrors
);
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.post(
	"/customer",
	body([
		"lastname",
		"firstname",
		"middleinitial",
		"email",
		"customerPhone",
		"customerShipAddLn1",
		"customerShipAddLn2",
		"customerShipAddCity",
		"customerShipAddState",
		"customerShipAddZIP",
		"customerDOB",
	]).isString(),
	handleInputErrors
);
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.delete("/customer/:id", () => {
	//
});

/**
 * @description - All customer account routes
 */

// Available only to Sensei users ADMIN, CUSTSERV
r.get("/account", () => {
	//
});
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.get("/account/:id", () => {
	//
});
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.put(
	"/account/:id",
	body([
		"login",
		"password",
		"lastname",
		"firstname",
		"middleinitial",
		"email",
		"customerPhone",
		"customerBillingAddLn1",
		"customerBillingAddLn2",
		"customerBillingAddCity",
		"customerBillingAddState",
		"customerBillingAddZIP",
		"customerShipAddLn1",
		"customerShipAddLn2",
		"customerShipAddCity",
		"customerShipAddState",
		"customerShipAddZIP",
		"customerDOB",
	]).isString(),
	handleInputErrors,
	updateCustomerAccount
);
// Available only to authenticated customer and Sensei users ADMIN, CUSTSERV
r.delete("/account/:id", () => {
	//
});

/**
 * @description Customer favorite products route
 */

// Available only to Sensei users ADMIN, CUSTSERV, and PRODMGMT and authenticated customer
r.get("/product/favorites", getFavoriteProducts);

export default r;
