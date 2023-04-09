// Integration testing with Jest and Supertest
import app from "../../server";
import supertest from "supertest";

describe("GET /", () => {
	it("should send back some data", async () => {
		const res = await supertest(app).get("/");

		expect(res.body.message).toBe("Hello, Madison. This is express.");
	});
});
