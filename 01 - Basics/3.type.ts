// Type - A way to define a custom type in TypeScript
// Type is similar to an interface, but it can also be used to define primitive types, union types, and more. 
// Types are more flexible than interfaces and can be used in a wider range of scenarios.

// Using type aliases for a object
type UserDetails = {
  name: string;          // Property 'name' of type string
  age: number;           // Property 'age' of type number
  isActive: boolean;     // Property 'isActive' of type boolean
  getName: () => void;   // Method 'getName'
}

// Using the UserDetails type to define an object
let user_1: UserDetails = {
  name: "Alice",
  age: 25,
  isActive: true,
  getName: function () {
    console.log(this.name);
  }
};

// Another object adhering to the UserDetails type
let user_2: UserDetails = {
  name: "Bob",
  age: 30,
  isActive: false,
  getName () {
    console.log(this.name);
  }
};

// Using type aliases for primitive types
type Active = boolean;
type Name = string;
type Age = number;

let is_active: Active = true;  // isActive is of type boolean
let user_name: Name = "Alice"; // userName is of type string
let user_age: Age = 25;        // userAge is of type number


// Note:
// 1. Type aliases can be used for objects as well as primitives or even named types unlike interfaces which are used for objects only.