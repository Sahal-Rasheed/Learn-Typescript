// `typeof` in TypeScript
// The `typeof` operator acts as a type query. It captures the type of an existing variable or constant so that you can reuse that type elsewhere on your code. This is particularly useful when you want to create a new type based on the type of an existing variable or constant without having to manually define the type again.
// Example: If you define a `status` object, `typeof status` lets TypeScript know the shape of that object.

// `keyof` in TypeScript
// The `keyof` operator extracts the keys of an object type, returning a union of literal string types representing the property names.
// Use Case: This is used in combination with `typeof` to create a new type that represents the keys of an existing object type.
// Example: If you have a `status` object, `keyof typeof status` will give you a type that represents the keys of that object.

// note: `typeof` and `keyof` are better alternatives to `enum` in TypeScript, as they provide more flexibility, type safety, and better integration with other TypeScript features. You can also use `union types` or `named types` in these cases to achieve similar functionality over enums.

const statusType = {
    PENDING: "pending",
    ACTIVE: "active",
    INACTIVE: "inactive"
}

function getStatusValue(status: keyof typeof statusType): string {
    // return statusType;       // if you wanna return key itself
    return statusType[status];  // if you wanna return value of the key
}

const statusValue = getStatusValue("ACTIVE");    // Valid, returns "active"
const statusValue2 = getStatusValue("PENDING");  // Valid, returns "pending"
// const statusValue3 = getStatusValue("UNKNOWN");  // Error: Argument of type '"UNKNOWN"' is not assignable to parameter of type '"PENDING" | "ACTIVE" | "INACTIVE"'.

// `as const` can be used in combination with `typeof` and `keyof` to ensure that the object is treated as a constant, preventing any modifications to its properties via code.

const statusType2 = {
    PENDING: "pending",
    ACTIVE: "active",
    INACTIVE: "inactive"
} as const;

function getStatusValue2(status: keyof typeof statusType2): string {
    // statusType2.PENDING = "new value";  // Error: Cannot assign to 'PENDING' because it is a read-only property.
    return statusType2[status];
}
