export const errorHandler = (err, req, res, next) => {
	if (err.type === "auth") {
		res.status(401).json({ message: "unauthorized" });
	} else if (err.type === "input") {
		res.status(400).json({ message: "invalid input" });
	} else {
		res.status(500).json({ message: "there was an error on our end" });
	}
};
