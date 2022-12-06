import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}

	try {
		const customerAccount = jwt.verify(token, process.env.JWT_SECRET);
		req.customerAccount = customerAccount;
		next();
	} catch (e) {
		console.log(e);
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}
};

export const handleInputErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400);
		res.json({ errors: errors.array() });
	} else {
		next();
	}
};
