import { Router } from "express";

const router = Router();

/**
 * @description - All product route handlers
 */

router.get("/product", (req, res) => {
	res.json({ message: "Hello from the /product route get request" });
});
router.get("/product/:id", () => {
	//
});
router.put("/product/:id", () => {
	//
});
router.post("/product", () => {
	//
});
router.delete("/product/:id", () => {
	//
});

/**
 * @description - All customer route handlers
 */

router.get("/customer", () => {
	//
});
router.get("/customer/:id", () => {
	//
});
router.put("/customer/:id", () => {
	//
});
router.post("/customer", () => {
	//
});
router.delete("/customer/:id", () => {
	//
});

/**
 * @description - All customer account route handlers
 */

router.get("/account", () => {
	//
});
router.get("/account/:id", () => {
	//
});
router.put("/account/:id", () => {
	//
});
router.post("/account", () => {
	//
});
router.delete("/account/:id", () => {
	//
});

export default router;
