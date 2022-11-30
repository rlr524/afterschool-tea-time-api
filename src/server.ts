import { createCustomerAccount, signin } from "./handlers/customer";
import { createUserAccount, userSignin } from "./handlers/user";
import express from "express";
import { body, validationResult } from "express-validator";
import router from "./routes/v1";
import { protect } from "./middleware";
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

// Handle these routes separate from all other routes to avoid the protect middleware.
// TODO: Refactor the express-validator functions into a separate middleware
app.post(
	"/account",
	body("login").isString(),
	body("password").isString(),
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
		createCustomerAccount;
	}
);

app.post(
	"/signin",
	body("login").isString(),
	body("password").isString(),
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400);
			res.json({ errors: errors.array() });
		}
		signin;
	}
);

app.post("/sensei-account", createUserAccount);
app.post("/sensei-signin", userSignin);
app.get("/product", (req, res) => {
	res.json({ message: "Hello from the /product route" });
});
// Open route
app.get("/product/:id", () => {
	//
});

export default app;
