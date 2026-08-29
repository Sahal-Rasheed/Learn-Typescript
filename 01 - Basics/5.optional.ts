// Optional - A way to specify that a property or parameter is not required (optional).
// In TypeScript, you can mark a property or parameter as optional by using the '?' symbol.
type Profile = {
    name: string;          // Property 'name' of type string
    age: number;           // Property 'age' of type number
    isActive?: boolean;    // Optional - property 'isActive' of type boolean
    getName?: () => void;  // Optional - method 'getName'
}

let profile1: Profile = {
    name: "Alice",
    age: 25,
    isActive: true,
    getName: function () {
        console.log(this.name);
    }
};

let profile2: Profile = {
    name: "Bob",
    age: 30
    // 'isActive' and 'getName' are optional and can be omitted (no errors)
};
