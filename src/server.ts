import { createNewCustomerAccount, signin } from "./handlers/customer";
import express from "express";
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
app.post("/account", createNewCustomerAccount);
app.post("/signin", signin);

export default app;
