import { createJWT, hashPassword, comparePasswords } from "./../modules/auth";
import prisma from "../db";

export const createUserAccount = async (req, res) => {
	const userLoginCandidate = req.body.username;

	if (
		await prisma.userAccount.findFirst({
			where: { userAccountLogin: userLoginCandidate },
		})
	) {
		res.status(406);
		res.json({
			message: `customer account login '${userLoginCandidate}' is unavailable`,
		});
		return;
	}

	const userAccount = await prisma.userAccount.create({
		data: {
			userAccountLogin: userLoginCandidate,
			userAccountPassword: await hashPassword(req.body.password),
			userAccountEmail: req.body.email,
		},
	});

	const token = createJWT(userAccount);
	res.json({ token });
};

export const userSignin = async (req, res) => {
	const userAccount = await prisma.userAccount.findUnique({
		where: {
			userAccountLogin: req.body.username,
		},
	});
	const isValid = await comparePasswords(
		req.body.password,
		userAccount.userAccountPassword
	);

	if (!isValid) {
		res.status(401);
		res.json({
			message: "not authorized: please check your login and password",
		});
		return;
	}

	const token = createJWT(userAccount);
	res.json({ token });
};
