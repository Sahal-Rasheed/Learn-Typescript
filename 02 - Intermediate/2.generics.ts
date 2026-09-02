// Generics in TypeScript
// Generics allow you to create reusable components that can work with a variety of types rather than a single one. They provide a way to define functions, classes, and interfaces that can operate on different data types while still maintaining type safety.
// Using generics, we can easily overcome the situations where we used `function overloading`, `union types with conditional statements` and `any type` to achieve the same functionality. Generics provide a more elegant and type-safe solution for these scenarios.

// Example of a generic function
function identity<T>(arg: T): T {
    return arg;
}

// Using the generic function with different types
let output1 = identity<string>("Hello, Generics!"); // Output: Hello, Generics!
let output2 = identity<number>(42);                 // Output: 42

// Note:
// 1. The <T> syntax is used to define a generic type parameter. T can be replaced with any valid identifier of our choice, and it represents a placeholder for the actual type that will be provided when the function is called.
// 2. When calling the identity function, we specify the type argument (e.g., string or number) in angle brackets, this value is then resolved in place of the `T` type parameter (here, in the function definition and return type).


// -------------------------------------------------


// Example 1: Generic function to display user/admin details
type UserDetailss = {
    name: string;
    age: number;
}

type AdminDetailss = {
    firstName: string;
    role: string;
}

const userDetailss: UserDetailss = {
    name: "Alice",
    age: 25
};

const adminDetailss: AdminDetailss = {
    firstName: "Bob",
    role: "Admin"
};

// Generic function to display user/admin details
function displayDetails<T>(details: T): T {
    return details;
}

const userValue = displayDetails<UserDetailss>(userDetailss);
const adminValue = displayDetails<AdminDetailss>(adminDetailss);
console.log(userValue);  // Output: { name: 'Alice', age: 25 }
console.log(adminValue); // Output: { firstName: 'Bob', role: 'Admin' }

// Note:
// 1. With generics, we can create a single function that can handle different types of data (UserDetailss and AdminDetailss in this case) without the need for function overloading or union types. This makes the code more concise and easier to maintain.
// 2. The return value `userValue` and `adminValue` will be of the same type as the input parameter, thus we can access the properties by using dot notation without any type errors. For example, we can access `userValue.name` and `adminValue.firstName` without any issues.
// 3. Scope of generics in functions: When a generic type parameter (like <T>) is declared on a function, its scope covers the entire function block { ... }, not just the parameters and the return statement.


// Example 2: Generic interface
interface Box<T> {
    content: T;
}

const stringBox: Box<string> = { content: "Hello, Generics!" };
const numberBox: Box<number> = { content: 42 };

console.log(stringBox.content); // Output: Hello, Generics!
console.log(numberBox.content); // Output: 42

// other
interface ApiPromise<T> {
    status: number;
    data: T;
}

const userApiResponse: ApiPromise<{ name: string; age: number }> = {
    status: 200,
    data: {
        name: "Alice",
        age: 25
    }
};

// Note:
// 1. The generic interface `Box<T>` allows us to create boxes that can hold different types of content (string or number in this case) while maintaining type safety.
// 2. When creating instances of the `Box` interface, we specify the type argument (e.g., string or number) in angle brackets, which determines the type of the `content` property.
// 3. The `ApiPromise<T>` interface demonstrates how generics can be used in more complex scenarios, such as API responses, where the data type can vary based on the specific API endpoint being called. Here we have defined the `data` property to be of type `T`, allowing us to specify the expected data structure (here its object, it can be any type) when creating instances of the `ApiPromise` interface.


// Example 3: Generic class to perform operations on numbers and strings
// class GenericNumber<T> {
//     zeroValue: T;
//     add: (x: T, y: T) => T;

//     constructor(zeroValue: T, addFunction: (x: T, y: T) => T) {
//         this.zeroValue = zeroValue;
//         this.add = addFunction;
//     }
// }

// // Using the generic class with different types
// let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
// console.log(myGenericNumber.add(5, 10)); // Output: 15
// let myGenericString = new GenericNumber<string>("", (x, y) => x + y);
// console.log(myGenericString.add("Hello, ", "Generics!")); // Output: Hello, Generics!
