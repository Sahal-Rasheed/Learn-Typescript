// Infer Types or Implicit Types
let userName = "John Doe"; // TypeScript infers the type as string (automatically)
userName = "Jane Smith";   // Valid assignment
// userName = 42;          // Error: Type 'number' is not assignable to type 'string'


// Defining Types or Explicit Types
let userAge: number = 30;  // Explicitly defining the type as number
userAge = 31;              // Valid assignment
// userAge = "thirty";     // Error: Type 'string' is not assignable to type 'number'


// Some Examples of Types
let isActive: boolean = true;  // boolean type

let userScores: number[] = [85, 90, 78];  // array of numbers
let userRoles: string[] = ["admin", "editor", "viewer"];  // array of strings
let emptyArray: [] = []; // empty array with no specific type
let readonlyArray: readonly number[] = [1, 2, 3]; // readonly array of numbers

let userDetails: { name: string; age: number } = { name: "Alice", age: 25 };  // object with specific properties and types
type Point = { x: number; y: number };
const point: Point[] = [{ x: 10, y: 20 }, { x: 30, y: 40 }]; // array of Point objects using type alias
const point2: Array<{ x: number; y: number }> = [{ x: 10, y: 20 }, { x: 30, y: 40 }]; // array of objects using generic Array type
