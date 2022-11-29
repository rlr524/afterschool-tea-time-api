import { createJWT, hashPassword, comparePasswords } from "./../modules/auth";
import prisma from "../db";

// TODO: Add a func to lookup the generated acct numb in the db and if it exists generate a new one and re-check
function createAccountNumber() {
	return Math.floor(Date.now() / 1000);
}

export const createNewCustomerAccount = async (req, res) => {
	const customerLoginCandidate = req.body.username;

	if (
		await prisma.customerAccount.findFirst({
			where: { customerLogin: customerLoginCandidate },
		})
	) {
		res.status(406);
		res.json({
			message: `customer account login '${customerLoginCandidate}' is unavailable`,
		});
		return;
	}

	const customerAccount = await prisma.customerAccount.create({
		data: {
			customerLogin: customerLoginCandidate,
			customerPassword: await hashPassword(req.body.password),
			customerAccountNumber: createAccountNumber(),
			customerBillingAddLn1: req.body.customerBillingAddLn1,
			customerBillingAddLn2: req.body.customerBillingAddLn2,
			customerBillingAddCity: req.body.customerBillingAddCity,
			customerBillingAddState: req.body.customerBillingAddState,
			customerBillingAddZIP: req.body.customerBillingAddZIP,
		},
	});

	const token = createJWT(customerAccount);
	res.json({ token });
};

export const signin = async (req, res) => {
	const customerAccount = await prisma.customerAccount.findUnique({
		where: {
			customerLogin: req.body.username,
		},
	});
	const isValid = await comparePasswords(
		req.body.password,
		customerAccount.customerPassword
	);

	if (!isValid) {
		res.status(401);
		res.json({
			message: "not authorized: please check your login and password",
		});
		return;
	}

	const token = createJWT(customerAccount);
	res.json({ token });
};
