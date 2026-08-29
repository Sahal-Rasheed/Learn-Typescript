// Union - A way to specify that a value can be one of several types.
let userStatus: string | number;  // userStatus can be either a string or a number
userStatus = "active";            // Valid assignment
userStatus = 1;                   // Valid assignment
// userStatus = true;             // Error: Type 'boolean' is not assignable to type 'string | number'


// Union types for an array
let skills: (string | number)[] = ["JavaScript", "TypeScript", "React", 1, 2, 3];  // array of strings, numbers, or both  


// Union types for a object
type Details = {
  name: string;
  age: number | string;           // age can be either a number or a string
}
