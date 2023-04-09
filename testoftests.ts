// not testable
/*
const value = 100;
const action = () => {
	console.log(value);
};
*/

// Why isn't it testable?
// 1. It isn't exported
// 2. Even if it was, the state that the function relies on is in the global scope and won't be exported
// along with the function. If we want to mock it, we need to create a state (named value) for our test.

// testable
export const testableAction = (value) => {
	console.log(value);
};

// This is testable because it is exported but also because it brings its state along with it and can be
// easily mocked and isn't bound to the file in which it's contained.
