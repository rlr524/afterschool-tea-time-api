import { Router } from "express";
import { body, validationResult } from "express-validator";

const r = Router();

/**
 * @description - All product route handlers
 */

r.get("/product", (req, res) => {
	res.json({ message: "Hello from the /product route" });
});
r.get("/product/:id", () => {
	//
});
r.put("/product/:id", () => {
	//
});
r.post("/product", () => {
	//
});
r.delete("/product/:id", () => {
	//
});

/**
 * @description - All customer route handlers
 */

r.get("/customer", () => {
	//
});
r.get("/customer/:id", () => {
	//
});
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
r.post("/customer", () => {
	//
});
r.delete("/customer/:id", () => {
	//
});

/**
 * @description - All customer account route handlers
 */

r.get("/account", () => {
	//
});
r.get("/account/:id", () => {
	//
});
r.put("/account/:id", () => {
	//
});
r.delete("/account/:id", () => {
	//
});

export default r;
