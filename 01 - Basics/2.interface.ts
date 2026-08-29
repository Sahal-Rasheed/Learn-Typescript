// Interfaces - A way to define the structure of an object
// An interface defines the shape of an object, including its properties and their types. With interfaces, you can reuse the same structure across multiple objects, ensuring consistency and type safety.
interface User {
  name: string;          // Property 'name' of type string
  age: number;           // Property 'age' of type number
  isActive: boolean;     // Property 'isActive' of type boolean
  getName: () => void;   // Method 'getName'
}

// Using the User interface to define an object
let user1: User = {
  name: "Alice",
  age: 25,
  isActive: true,
  getName: function () {
    console.log(this.name);
  }
};

// Another object adhering to the User interface
let user2: User = {
  name: "Bob",
  age: 30,
  isActive: false,
  getName () {
    console.log(this.name);
  }
};
