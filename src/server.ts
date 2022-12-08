import { createCustomerAccount, signin } from "./handlers/customer";
import { createUserAccount, userSignin } from "./handlers/user";
import { getOneProduct, getAllProducts } from "./handlers/product";
import express from "express";
import { body } from "express-validator";
import router from "./routes/v1";
import { handleInputErrors, protect } from "./middleware";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();

const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "../logs/", "access.log"),
	{ flags: "a" }
);

app.use(cors());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	console.log("Hello, Madison from express");
	res.status(200);
	res.json({ message: "Hello, Madison. This is express." });
});

app.use("/api/v1/", protect, router);

/**
 * @description - Handle these routes separate from all other routes to avoid the protect middleware as these routes are available to any user whether authenticated or not.
 * @todo - Refactor the express-validator functions into a separate middleware
 * @todo - Find a different way to server validate DOB without using express-validator and use DATE as the type. This is because express-validator hangs if any other type checks are chained onto isString().
 */

app.post(
	"/account",
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
	createCustomerAccount
);
app.post(
	"/signin",
	body(["login", "password"]).isString(),
	handleInputErrors,
	signin
);

app.get("/product", getAllProducts);
app.get("/product/:id", getOneProduct);

app.post("/sensei-account", createUserAccount);
app.post("/sensei-signin", userSignin);

export default app;
