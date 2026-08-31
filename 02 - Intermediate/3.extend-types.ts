// Extending Types in TypeScript

// 1. Extending types in `type` aliases [`& {}`, `=`]
type UserDetailsss = {
    name: string;
    age: number;
}

type AdminDetailsss = {
    name: string;
    age: number;
    role: string;
}

// here, UserDetailsss and AdminDetailsss have common properties (name and age), we can extend UserDetailsss to AdminDetailsss to avoid repetition
// type AdminDetailsss = UserDetailsss & {
//     role: string;
// } 
// OR
type ExtendedAdminDetailsss = UserDetailsss & {
    role: string;
}

// suppose if we want to create another type that has same properties as UserDetailsss without any additional properties, we can do it like this without receating a new type again with same properties
type AnotherUserDetailsss = UserDetailsss;


// 2. Extending types in `interface` [`extends`]
interface UserInterface {
    name: string;
    age: number;
}

interface AdminInterface extends UserInterface {
    role: string;
}

// here, AdminInterface extends UserInterface, so it inherits the properties of UserInterface (name and age) and adds its own property (role).

// suppose if we want to create another interface that has same properties as UserInterface without any additional properties, we can do it like this without receating a new interface type again with same properties
interface AnotherUserInterface extends UserInterface {}
