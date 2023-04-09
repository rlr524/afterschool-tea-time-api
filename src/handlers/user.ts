import {
	createJWTUser,
	hashPassword,
	comparePasswords,
} from "./../modules/auth";
import prisma from "../db";

/**
 * @param req
 * @param res
 * @description - Create one Sensei user account
 * @access - Sensei users as validated by HTT IP address
 * @route /sensei-user
 * @method POST
 */
export const createUserAccount = async (req, res, next) => {
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

	try {
		const userAccount = await prisma.userAccount.create({
			data: {
				userAccountLogin: userLoginCandidate,
				userAccountPassword: await hashPassword(req.body.password),
				userAccountEmail: req.body.email,
			},
		});
		const token = createJWTUser(userAccount);
		res.json({ token });
	} catch (e) {
		e.type = "input";
		next(e);
	}
};

/**
 * @param req
 * @param res
 * @description - Sign into a Sensei user account
 * @access - Sensei users as validated by HTT IP address
 * @route /sensei-signin
 * @method POST
 */
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

	const token = createJWTUser(userAccount);
	res.json({ token });
};
