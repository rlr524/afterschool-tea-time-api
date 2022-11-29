import { Router } from "express";

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
r.put("/customer/:id", () => {
	//
});
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
