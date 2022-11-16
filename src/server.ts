import express from "express";
import router from "./routes/v1";

const app = express();

app.get("/", (req, res) => {
	console.log("Hello, Madison from express");
	res.status(200);
	res.json({ message: "Hello, Madison. This is express." });
});

app.use("/api/v1/", router);

export default app;
