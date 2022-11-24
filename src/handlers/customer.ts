import { createJWT, hashPassword } from "./../modules/auth";
import prisma from "../db";

// TODO: Add a func to lookup the generated acct numb in the db and if it exists generate a new one and re-check
function createAccountNumber() {
	return Math.floor(Date.now() / 10);
}

export const createNewCustomerAccount = async (req, res) => {
	const customerAccount = await prisma.customerAccount.create({
		data: {
			customerLogin: req.body.customerLogin,
			customerPassword: await hashPassword(req.body.customerPassword),
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
