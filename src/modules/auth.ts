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
