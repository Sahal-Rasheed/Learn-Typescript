// TypeScript `as` keyword
// The `as` keyword in TypeScript is used for type assertions (or type casting). It allows you to tell the TypeScript compiler to treat a value as a specific type.

// `as const`
// The `as const` assertion in TypeScript is used to indicate that the value should be treated as a constant.
// When you use `as const`, we cannot reassign the value of a variable to a different value.
// Similar like how `const` works in JavaScript.
let value = "Hello, World!" as const;  // value is treated as a constant and cannot be reassigned
// value = "New Value";  // Error: Cannot assign to 'value' because it is a constant.


// as `string`
// The `as string` assertion in TypeScript is used to tell the compiler that a value should be treated as a string type only.
let someValue = "Hello, TypeScript!" as string;  // someValue is treated as a string type
someValue = "New String Value";  // Valid assignment
// someValue = 42;  // Error: Type 'number' is not assignable to type 'string'.


// as `number`
// The `as number` assertion in TypeScript is used to tell the compiler that a value should be treated as a number type only.
let someNumber = 42 as number;  // someNumber is treated as a number type
someNumber = 100;  // Valid assignment
// someNumber = "Not a Number";  // Error: Type 'string' is not assignable to type 'number'.


// as `boolean`
// The `as boolean` assertion in TypeScript is used to tell the compiler that a value should be treated as a boolean type only.
let someBoolean = true as boolean;  // someBoolean is treated as a boolean type
someBoolean = false;  // Valid assignment
// someBoolean = "Not a Boolean";  // Error: Type 'string' is not assignable to type 'boolean'.
