// Function Overloading in TypeScript
// Function overloading allows you to define multiple function signatures for a single function implementation. This is useful when you want a function to handle different types of input parameters and return types.


// CASE 1: Suppose you have a add() function that can add two numbers or concatenate two strings. You can use `union` types and conditional logic to handle both cases in a single function implementation. However, this can lead to less clear code and potential runtime errors if the input types are not handled correctly. Instead, you can use function overloading to define multiple signatures for the add() function, each with its own input and output types.
function add_(a: number | string, b: number | string): number | string {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;  // If both are numbers, return their sum
    } else if (typeof a === "string" && typeof b === "string") {
        return a + b;  // If both are strings, return their concatenation
    } else {
        throw new Error("Invalid input types. Both parameters must be either numbers or strings.");
    }
}

// If we are using above union types based approach we need conditional checks inside the function to determine the types of the parameters and handle them accordingly. A much cleaner and more type-safe approach is to use function overloading -> implemntation is below:

function add(a: number, b: number): number;  // Overload signature for adding two numbers (number type case)
function add(a: string, b: string): string;  // Overload signature for concatenating two strings (string type case)
function add(a: any, b: any): any {          // Implementation signature that handles both cases
    return a + b;
}
add(5, 10);                // Output: 15 (number type case)
add("Hello, ", "World!");  // Output: Hello, World! (string type case)

// Note:
// 1. The first two function declarations are the overload signatures, which define the different ways the add() function can be called. The third function declaration is the implementation signature, which contains the actual logic for adding numbers or concatenating strings.
// 2. If we use `any` type only without overload signatures, anything can be passed to this fn for adding but now with the overload signatures, we can only pass either two numbers or two strings to the add() function. If we try to pass a number and a string, TypeScript will throw a compile-time error, ensuring type safety.
// 3. Actually this is a less common pattern we use in TypeScript, to solve this issue we have `generics` which is a more common pattern in TypeScript.
