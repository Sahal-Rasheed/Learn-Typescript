// Functions in TypeScript

// Type Annotations for Function using Inline Type Annotations >>

function addNumbers(a: number, b: number): number {
    return a + b;
}

const result = addNumbers(5, 10);
console.log(result);  // Output: 15

// Function with optional parameter
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));                // Output: Hello, Alice!
console.log(greet("Bob", "Good morning"));  // Output: Good morning, Bob!

// Function with default parameter
function multiply(a: number, b: number = 1): number {
    return a * b;
}

console.log(multiply(5));     // Output: 5 (b defaults to 1)
console.log(multiply(5, 2));  // Output: 10

// Function with rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // Output: 15

// Function with object parameter
function displayUser(user: { name: string; age: number }): void {
    console.log(`Name: ${user.name}, Age: ${user.age}`);
}

displayUser({ name: "Alice", age: 25 });  // Output: Name: Alice, Age: 25

// Function with object parameter destructed
function displayUserDestructured({ name, age }: { name: string; age: number }): void {
    console.log(`Name: ${name}, Age: ${age}`);
}

displayUserDestructured({ name: "Bob", age: 30 });  // Output: Name: Bob, Age: 30


// Type Annotations for Function using Type Aliases >>

type UserInfo = {
    name: string;
    age: number;
    salary?: number;
}
function displayUserInfo(user: UserInfo): void {
    console.log(`Name: ${user.name}, Age: ${user.age}`);
    if (user.salary !== undefined) {
        console.log(`Salary: ${user.salary}`);
    }
}

const user_one: UserInfo = { name: "Alice", age: 25, salary: 50000 };
const user_two: UserInfo = { name: "Bob", age: 30 };

displayUserInfo(user_one);  // Output: Name: Alice, Age: 25, Salary: 50000
displayUserInfo(user_two);  // Output: Name: Bob, Age: 30


// Note:
// 1. `void` is used as the return type for functions that do not return a value. It indicates that the function performs an action but does not produce a result  (for example if we use console.log() inside a function).
// 2. We can also return custom types or interfaces we created from functions not only primitives.
