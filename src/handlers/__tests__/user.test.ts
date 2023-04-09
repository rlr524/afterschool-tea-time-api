// Unit testing with Jest
import * as user from "../user";
/*
describe("user handler", () => {
	it("should do something when something happens", () => {
		expect(1).toBe(1);
	});
});
*/

// Need to use a testing db and update Jest to clean the db after every test. Tests should be stateless and
// not reliant on db updates from some other test.
// @todo - Add test db and update Jest config
describe("createUserAccount handler", () => {
	it("should create a new user", async () => {
		const req = {
			body: {
				username: "test_apr8",
				password: "testapril8",
				email: "testapr8@htt.com",
			},
		};
		const res = {
			status() {
				expect(200);
			},
			json({ token }) {
				console.log(token);
				expect(token).toBeTruthy;
			},
		};
		await user.createUserAccount(req, res, () => {
			console.log("");
		});
	});
});
