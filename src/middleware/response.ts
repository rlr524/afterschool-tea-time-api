function routeMessage(req, res, next) {
	req.productmessage = "Hello, Madison, from the /product route";
	next();
}

export { routeMessage };
