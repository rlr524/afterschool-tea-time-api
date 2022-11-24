import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

export const createJWT = (customerAccount) => {
	const token = jwt.sign(
		{
			id: customerAccount.id,
			customerLogin: customerAccount.customerLogin,
		},
		process.env.JWT_SECRET
	);
	return token;
};

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
