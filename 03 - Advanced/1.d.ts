// `.d.ts` files are TypeScript declaration files that provide type information about JavaScript code. They are used to describe the shape of existing JavaScript code, allowing TypeScript to understand the types and structures of the code without having to rewrite it in TypeScript.

// These files are especially useful as they allow TypeScript to provide type checking and autocompletion for those libraries.

// When we install Typescript its associated type declaration files are also installed. These files have the extension `.d.ts` and are used to provide type information.

// When we install a third-party library, we can also install its type declaration files separately if they are not included in the library itself. To install type declaration files the common format is `-D @types/library-name`. For example, if we want to use the `axios` library in our TypeScript project, we can install its type declaration files using the command `npm install -D @types/axios`. 

// We can import the types directly using the `import` statement from library, or we can use `import type` to import only the types without including the actual code. This can help reduce the size of the final JavaScript bundle and improve performance.

// Sometimes if types are not available for a library to install, visit their documentation - in most case they will mention to create a `.d.ts` file and add the types manually by copying the types from their documentation.
