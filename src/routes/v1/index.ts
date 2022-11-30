import { Router } from "express";
import { body, validationResult } from "express-validator";

const r = Router();

/**
 * Account vs Customer
 * The /account routes reference the CustomerAccount table and are required for shopping on HTT. Creating a
 * customer account via the POST /account route (in server.ts as it's not a protected route) creates an account
 * and a customer profile, so creates entries in the CustomerAccount, CustomerProfile and CustomerDetail tables.
 * The /customer routes reference the CustomerProfile and CustomerDetail tables and are additional shopper
 * profiles linked to a single customer account (think Netflix profiles) in that they all sign in with the same
 * login and password, but have their own shopping profiles including limits that can be managed only by the
 * account owner with a specific PIN. This allows, for example, parents to allow college aged children to
 * make purchases while away at school on the parent's account.
 */

/**
 * @description - Senpai user roduct route handlers
 */

// Available only to Senpai users ADMIN, PRODMGMT
r.put("/product/:id", () => {
	//
});
// Available only to Senpai users ADMIN, PRODMGMT
r.post("/product", () => {
	//
});
// Available only to Senpai users ADMIN, PRODMGMT
r.delete("/product/:id", () => {
	//
});

/**
 * @description - All customer route handlers
 */

// Available only to Senpai users ADMIN, CUSTSERV
r.get("/customer", () => {
	//
});
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.get("/customer/:id", () => {
	//
});
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.put(
	"/customer/:id",
	body("lastname").isString(),
	body("firstname").isString(),
	body("middleinitial").isString(),
	body("email").isString(),
	body("customerPhone").isString(),
	body("customerShipAddLn1").isString(),
	body("customerShipAddLn2").isString(),
	body("customerShipAddCity").isString(),
	body("customerShipAddState").isString(),
	body("customerShipAddZIP").isString(),
	body("customerDOB").isDate(),
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400);
			res.json({ errors: errors.array() });
		}
	}
);
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.post(
	"/customer",
	body("lastname").isString(),
	body("firstname").isString(),
	body("middleinitial").isString(),
	body("email").isString(),
	body("customerPhone").isString(),
	body("customerShipAddLn1").isString(),
	body("customerShipAddLn2").isString(),
	body("customerShipAddCity").isString(),
	body("customerShipAddState").isString(),
	body("customerShipAddZIP").isString(),
	body("customerDOB").isDate(),
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400);
			res.json({ errors: errors.array });
		}
	}
);
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.delete("/customer/:id", () => {
	//
});

/**
 * @description - All customer account route handlers
 */

// Available only to Senpai users ADMIN, CUSTSERV
r.get("/account", () => {
	//
});
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.get("/account/:id", () => {
	//
});
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.put("/account/:id", () => {
	//
});
// Available only to authenticated customer and Senpai users ADMIN, CUSTSERV
r.delete("/account/:id", () => {
	//
});

export default r;
