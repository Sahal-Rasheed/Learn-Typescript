// Named Types in TypeScript
// Named types are a way to define a set of named constants in TypeScript. They allow you to define a collection of related values that can be used as a type.
// Once we define a named type to a variable, that variable can only take on the values defined in the named type. This helps to ensure that the variable can only have specific values, improving type safety and reducing errors in your code.

type StatusType = "active" | "inactive" | "pending";  // Named type for user status

let currentStatus: StatusType = "active";             // currentStatus can only be one of the named types in StatusType

let anotherStatus: string = "active";                 // anotherStatus can be any string, not limited to the named types in StatusType
