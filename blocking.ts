/* eslint-disable @typescript-eslint/no-var-requires */
// blocking

const fs = require("fs");
const path = require("path");

const me = "Madison";
console.log(me);

const result = fs.readFileSync(path.join(__dirname, "package.json"), "utf-8");
console.log(result);

function sayHi() {
	console.log("Hi, Madison");
}
setTimeout(sayHi, 5000);
