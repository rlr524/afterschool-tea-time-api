import express from "express";
import router from "./routes/v1";
import { routeMessage } from "./middleware/response";
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
app.use(routeMessage);

app.get("/", (req, res) => {
	console.log("Hello, Madison from express");
	res.status(200);
	res.json({ message: "Hello, Madison. This is express." });
});

app.use("/api/v1/", router);

export default app;
