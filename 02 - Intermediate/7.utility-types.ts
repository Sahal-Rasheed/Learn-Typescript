// Utility Types in TypeScript
// Utility types are built-in types provided by TypeScript that help to transform or manipulate existing types. They are basically generic types.

// Some commonly used utility types in TypeScript include:

// 1. Readonly<T> - This utility type takes an object type T and makes all its properties readonly, meaning they cannot be reassigned after initialization.
type NewUser = {
  name: string;
  age: number;
};

const newUser: Readonly<NewUser> = {
  name: "Alice",
  age: 25,
};

// newUser.name = "Bob";   // Error: Cannot assign to 'name' because it is a read-only property.


// 2. `readonly` keyword - The `readonly` keyword in TypeScript is used to mark properties of an object as read-only. This means that once a value is assigned to a property, it cannot be changed or reassigned. It is similar to the `const` keyword for variables, but it applies to object properties. *Note* that if you need all properties of an object to be read-only, you can use the `Readonly<T>` utility type instead of marking each property individually with `readonly`.
type Engine = {
    readonly type: string;
    horsepower: number;
    mode: string;
}

const engine: Engine = {
    type: "V8",
    horsepower: 400,
    mode: "Sport"
};

// engine.type = "V6";    // Error: Cannot assign to 'type' because it is a read-only property.
engine.horsepower = 450;  // Valid assignment, horsepower can be changed
engine.mode = "Eco";      // Valid assignment, mode can be changed


// 3. Partial<T> - This utility type takes an object type T and makes all its properties optional. We can also use the `?` operator after the key name to make a individual property optional, but using `Partial<T>` is more convenient when we want to make all properties optional at once.
type Person = {
  name: string;
  age: number;
  address: string;
};

const person: Partial<Person> = {
  name: "Bob",
  // age and address are optional now
};

const anotherPerson: Partial<Person> = {
  // name is optional now
  age: 30,
  address: "123 Main St",
};


// 4. Required<T> - This utility type takes an object type T and makes all its properties required. This is useful when we have a type with optional properties and we want to ensure that all properties are required in a specific context at that time we can use `Required<T>` to make all properties required and in other contexts we can use the original type itself without `Required<T>` to keep the properties optional.
type Car = {
  make?: string;
  model?: string;
  year?: number;
};

const car: Required<Car> = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
};

// const anotherCar: Required<Car> = {
//   make: "Honda",
//   // Error: Type '{ make: string; }' is missing the following properties from type 'Required<Car>': model, year.
// };


// 5. Pick<T, K> - This utility type takes an object type T and a set of keys K (which must be keys of T) and creates a new type with only the specified keys from T. This is useful when we want to create a new type that includes only a subset of properties from an existing type.
type UserDir = {
    id: number;
    name: string;
    email: string;
    age: number;
}

const userDir: Pick<UserDir, "id" | "name" | "email"> = { 
    // only the properties "id", "name", and "email" are included in the new type
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};


// 6. Omit<T, K> - This utility type takes an object type T and a set of keys K (which must be keys of T) and creates a new type with all properties from T except for the specified keys in K. This is useful when we want to create a new type that excludes certain properties from an existing type.
type UserDir2 = {
    id: number;
    name: string;
    email: string;
    age: number;
}

const userDir2: Omit<UserDir2, "id" |"age"> = {
    // all properties from UserDir2 are included in the new type except for "id" and "age"
    name: "Alice",
    email: "alice@example.com"
};


// 7. Exclude<T, U> - This utility type takes two types T and U and creates a new type that includes all properties from T except for those present in U. This is useful when we have a union type or named type and we want to exclude certain values from it. For union types or named types, we cannot use `Pick<T, K>` or `Omit<T, K>` because they are used for object types only. Instead, we can use `Exclude<T, U>` to exclude certain values from a union type or named type.

type Statuses = "active" | "inactive" | "pending";
const statusVal: Statuses = "active";                       // statusVal can be "active", "inactive", or "pending"
const statusVal2: Exclude<Statuses, "inactive"> = "active"; // statusVal2 can only be "active" or "pending", "inactive" is excluded


// 8. Record<K, T> - This utility type takes a set of keys K and a type T and creates a new object type with the specified keys K and values of type T. This is useful when we want to create an object type with dynamic keys and values of a specific type. If we dont know what all will be the keys and values of an object prior, we can use `Record<K, T>`.

// Example: Creating a record type for a food menu where the keys and values must be string type only.
type Food = Record<string, number>;  // The keys are of type string and the values are of type number

const food: Food = {
    apple: 1,
    banana: 2,
    orange: 3
    // grape: "4"   // Error: Type 'string' is not assignable to type 'number'.
};

// Example: Creating a record type for a food menu where the keys must be string type and the values must be boolean type only.
type Food2 = Record<string, boolean>;  // The keys are of type string and the values are of type boolean

const food2: Food2 = {
    apple: true,
    banana: false,
    orange: true
    // grape: 4   // Error: Type 'number' is not assignable to type 'boolean'.
};

// Example: Creating a record type for a food menu where the keys must be string type and the values can be of any type.
type Food3 = Record<string, any>;  // The keys are of type string and the values can be of any type

const food3: Food3 = {
    apple: 1,
    banana: "2",
    orange: true,
    grape: { price: 4 }
};


// 9. `any` type - The `any` type in TypeScript is a special type that allows a variable to hold any value, regardless of its type. When a variable is declared with the `any` type, it can be assigned values of different types without causing any type errors. However, using `any` should be avoided as much as possible because it defeats the purpose of using TypeScript's static typing system and can lead to potential runtime errors. Instead, it's recommended to use more specific types or union types to ensure type safety in your code.

const anyValue: any = "Hello, World!";  // value can be of any type
// we can use any property or method on a variable of type `any` without any error


// 10. `unknown` type - The `unknown` type in TypeScript is a safer alternative to the `any` type. It represents a value that could be of any type, but unlike `any`, it requires type checking or type assertions or type casting before performing operations on it. This helps to ensure type safety and prevents potential runtime errors. When a variable is declared with the `unknown` type, we cannot directly access its properties or call methods on it without first narrowing down its type using type guards or type assertions or type casting.

let unknownValue: unknown = "Hello, TypeScript!";
// unknownValue.toUpperCase();                       // Error: Object is of type 'unknown'. 
// If we try to access a property or call a method on a variable of type `unknown`, TypeScript will throw an error unlike `any` type where we can access any property or call any method without any error. This is because `unknown` type is a safer alternative to `any` type and requires type checking or type assertions or type casting before performing operations on it.

// case 1: using type checking
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase());         // Valid, as we have narrowed down the type to string
}

// case 2: using type assertions or type casting
const stringValue: string = unknownValue as string;
console.log(stringValue.toUpperCase());              // Valid, as we have asserted the type to string

// after narrowing down the type of `unknownValue` to `string`, we can now access its (string) properties and methods without any error.


// 11. `never` type - The `never` type in TypeScript represents a value that never occurs. It is used to indicate that a function never returns or always throws an error. A function with a return type of `never` cannot have a reachable end point, meaning it will either throw an error or enter an infinite loop. The `never` type is often used in scenarios where we want to indicate that a certain code path should never be reached.

// Example: A function that always throws an error and never returns a value
function throwError(message: string): never {
    throw new Error(message);
}


// 12. `void` type - The `void` type in TypeScript represents the absence of a value or the lack of a return value from a function. It is used to indicate that a function does not return any meaningful value. A function with a return type of `void` can still perform actions or have side effects, but it does not produce a value that can be used or assigned to a variable.

// Example: A function that logs a message to the console and does not return any value
function logMessage(message: string): void {
    console.log(message);
}


// 13. `null` type - The `null` type in TypeScript represents the intentional absence of any value. It is used to indicate that a variable or property does not have a value assigned to it. For example, sometimes we have `null` value for the `useRef` hook in React when we want to indicate that the reference is not yet assigned to any DOM element.
