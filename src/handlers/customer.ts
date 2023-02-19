import { createJWT, hashPassword, comparePasswords } from "./../modules/auth";
import prisma from "../db";

// TODO: Add a func to lookup the generated acct numb in the db and if it exists generate a new one and re-check
function createAccountNumber() {
	return Math.floor(Date.now() / 1000);
}

/**
 * @param req
 * @param res
 * @description - Create one customer account
 * @access - Public
 * @route /account
 * @method POST
 */
export const createCustomerAccount = async (req, res) => {
	const customerLoginCandidate = req.body.login;
	console.log("Customer login candidate is: " + customerLoginCandidate);

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

	console.log("Login candidate ok...adding data");

	const customerAccount = await prisma.customerAccount.create({
		data: {
			customerLogin: customerLoginCandidate,
			customerPassword: await hashPassword(req.body.password),
			customerAccountNumber: createAccountNumber(),
			customerLastName: req.body.lastname,
			customerFirstName: req.body.firstname,
			customerMiddleInitial: req.body.middleinitial,
			customerEmail: req.body.email,
			customerPhone: req.body.customerPhone,
			customerBillingAddLn1: req.body.customerBillingAddLn1,
			customerBillingAddLn2: req.body.customerBillingAddLn2,
			customerBillingAddCity: req.body.customerBillingAddCity,
			customerBillingAddState: req.body.customerBillingAddState,
			customerBillingAddZIP: req.body.customerBillingAddZIP,
			customerShipAddLn1: req.body.customerShipAddLn1,
			customerShipAddLn2: req.body.customerShipAddLn2,
			customerShipAddCity: req.body.customerShipAddCity,
			customerShipAddState: req.body.customerShipAddState,
			customerShipAddZIP: req.body.customerShipAddZIP,
			customerDOB: req.body.customerDOB,
		},
	});

	console.log("Data added...generating token");

	const token = createJWT(customerAccount);
	res.json({ token });
};

/**
 * @param req
 * @param res
 * @description - Update one customer account
 * @access - Authenticated customer account or Sensei CUSTSERV, ADMIN
 * @route /account
 * @method PUT
 */
export const updateCustomerAccount = async (req, res) => {
	const customerLoginCandidate = req.body.login;
	const id = "";

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

	await prisma.customerAccount.update({
		where: {
			customerAccountID: id,
		},
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
};

/**
 * @param req
 * @param res
 * @description - Sign into a customer account
 * @access - Public
 * @route /signin
 * @method POST
 */
export const signin = async (req, res) => {
	console.log("attempting signin...");
	const customerAccount = await prisma.customerAccount.findUnique({
		where: {
			customerLogin: req.body.login,
		},
	});
	console.log(customerAccount);
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
