import { createCustomerAccount, signin } from "./handlers/customer";
import { createUserAccount, userSignin } from "./handlers/user";
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

// Handle these routes separate from all other routes to avoid the protect middleware as these routes
// are available to any user whether authenticated or not.
// TODO: Refactor the express-validator functions into a separate middleware
// TODO: Find a different way to server validate DOB without using express-validator and use DATE as the type
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

app.post("/sensei-account", createUserAccount);
app.post("/sensei-signin", userSignin);
app.get("/product", (req, res) => {
	res.json({ message: "Hello from the /product route" });
});
app.get("/product/:id", () => {
	//
});

export default app;
