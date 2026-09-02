# React & TypeScript Quick Tips

#### Topics Included: 
* [1. Environment Setup & Configuration](#1-environment-setup--configuration)
* [2. Typing Component Props](#2-typing-component-props)
* [3. Extending Native HTML Elements](#3-extending-native-html-elements)
* [4. Typing the `children` Prop](#4-typing-the-children-prop)
* [5. Typing the `Event Handlers`](#5-typing-the-event-handlers)
* [6. Advanced Prop Types & Component Patterns](#6-advanced-prop-types--component-patterns)
* [7. Typing React Hooks](#7-typing-react-hooks)
* [8. Custom Hooks & Tuple Returns](#8-custom-hooks--tuple-returns)
* [9. Ref Forwarding (`React.forwardRef`)](#9-ref-forwarding-reactforwardref)

For a more comprehensive guide on React with TypeScript, check out [React + TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/).

## 1. Environment Setup & Configuration
To configure React with TypeScript successfully, several key packages and compiler options are required.

### Required Dependencies
Your project must declare the core React libraries alongside their corresponding type definitions inside `package.json`:
* **`react`** & **`react-dom`**: The runtime libraries.
* **`@types/react`** & **`@types/react-dom`**: The development dependencies that provide the types. Without these, compiling React with TypeScript is impossible.

### Key `tsconfig.json` Properties
One of the most important options in the configuration is **`jsx`**:
* **`jsx: "preserve"`**: The modern default that leaves JSX intact, allowing downstream transpilers (like Next.js's SWC compiler, ESBuild, or Babel) to handle compilation.
* **`jsx: "react-native"`**: Used primarily in React Native environments to compile elements correctly for the native packager.

> **Note:** Generally these are automatically configured when we setup the project using `vite` and all.

---

## 2. Typing Component Props
React components are functions that return JSX. We use interfaces or type aliases to strongly type their incoming props.

```typescript
// Declaring via Interface
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Declaring via Type Alias
type ButtonPropsType = {
  label: string;
  onClick: () => void;
};
```

### Best Practice: Type vs. Interface
* **Application Code**: You can use either `type` or `interface` as they behave almost identically for standard application code.
* **Component Libraries**: **Always use `interfaces`**. Interfaces support declaration merging and allow other developers to extend them using the `extends` keyword.

### Core Prop Patterns
* **React.FC**: Avoid `React.FC` because it implicitly handles children unpredictably across React versions and complicates generic types.
* **String Unions**: Use string union types to restrict options and provide rich autocompletion:
  ```typescript
  role: "admin" | "user" | "guest"
  ```
* **Arrays of Objects**: Use explicit object signatures to define arrays of complex shapes:
  ```typescript
  users: { id: string; name: string }[]
  ```
* **Optional Props**: Add a question mark (`?`) after the prop name to mark it optional, resolving the type inside the component as `T | undefined`.
* **Modern Default Props**: Avoid the deprecated `defaultProps` property. Instead, destructure props directly in the function arguments and assign default values:
  ```typescript
  export const Counter = ({ count = 0 }: { count?: number }) => { ... }
  ```
  TypeScript is smart enough to infer that `count` is a guaranteed `number` within this component's scope, even though it was declared as optional.

---

## 3. Extending Native HTML Elements
When building custom wrapper components (e.g., custom styled buttons or custom text fields), you want to accept all native attributes of that HTML element without manually declaring each one.

### Solution: `ComponentPropsWithoutRef`
Extend your interface with React's built-in element properties:

```typescript
import React from 'react';

interface CustomButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'secondary';
}

export const CustomButton = ({ variant = 'primary', children, ...props }: CustomButtonProps) => {
  return (
    <button className={`btn-${variant}`} {...props} >
      {children}
    </button>
  );
};

// Usage: Native attributes like 'type' and 'onClick' work out of the box
<CustomButton type="submit" variant="primary" onClick={() => alert('Clicked')}>
  Save Changes
</CustomButton>
```
* **How it works**: By extending `ComponentPropsWithoutRef<'button'>`, your component inherits every native button attribute (such as `onClick`, `disabled`, or `type`, `children`). Using the rest operator (`...props`) lets you spread those native attributes directly onto the HTML element, maintaining complete type safety.

---

## 4. Typing the `children` Prop - (`React.ReactNode` vs `React.ReactElement`)
When components act as visual wrappers or providers, they must accept a `children` prop.

### The Standard:
The standard type to use is **`React.ReactNode`** over `React.ReactElement` or `JSX.Element`.

```typescript
interface CardProps {
  // Accepts text, icons, multiple elements
  children: React.ReactNode; 
  // Strict: accepts ONLY a single valid JSX element (e.g., <Icon />)
  headerIcon: React.ReactElement; 
}

export function Card({ children, headerIcon }: CardProps) {
  return (
    <div>
      <header>{headerIcon}</header>

      <main>{children}</main>
    </div>
  );
}
```
* **Why it's superior**: `React.ReactNode` accepts *anything* React can natively render—including strings, numbers, single elements, portals, nested components, or arrays of components.
* **Avoid `JSX.Element` or `React.ReactElement`**: `JSX.Element` or `React.ReactElement` is extremely strict and only accepts a single, instantiated JSX component. It will throw compiler errors if you attempt to pass a string or a list of elements.
---

## 5. Typing the `Event Handlers`
When passing event handlers through custom props, there are two main approaches to type them correctly.

### The Two Core Event-Typing Methodologies

#### 1. Direct Synthetic Event Handlers
In React, we use a wrapper event system called **SyntheticEvents** to normalize behavior across web browsers. When defining custom props that accept standard event listeners, you should avoid using global browser event definitions (like typing `e: MouseEvent`). Global browser types are not assignable to React's SyntheticEvent interfaces.

Instead, we can use React's native event-handler interfaces, which can be imported directly from the `react` namespace:
* **`React.MouseEventHandler<HTMLButtonElement>`**
* **`React.FocusEventHandler<HTMLInputElement>`**
* **`React.FormEventHandler<HTMLFormElement>`**

When we use these types, TypeScript automatically types the event argument (`e`) inside the component's implementation, giving you full IDE autocomplete and preventing runtime crashes. 

```typescript
import React from 'react';

interface CustomButtonProps {
  label: string;
  // Direct event-handler typing (takes the DOM element as a generic)
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const CustomButton = ({ label, onClick }: CustomButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

---

#### 2. The Cleaner Standard: Dynamic Indexed Access Types
While copying and pasting the full type name from an IDE hover card is a common developer habit, a much more elegant, scalable design pattern is using **Indexed Access Types**.

Rather than manually importing and typing long generics (like `React.MouseEventHandler<HTMLButtonElement>`), you can dynamically query the props of any standard HTML tag from React's native type map using **`React.ComponentProps`** and indexing into the specific listener:

```typescript
import React from 'react';

interface CleanButtonProps {
  label: string;
  // Querying standard button props and pulling the exact typing of its onClick handler
  onClick: React.ComponentProps<'button'>['onClick'];
}

export const CleanButton = ({ label, onClick }: CleanButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

**Why this is a game-changer:**
* **Less boilerplate**: No need to maintain long element generics.

* **Automatic Optionality**: Since `onClick` is naturally optional on a native standard HTML button, the extracted type automatically maps to `React.MouseEventHandler<HTMLButtonElement> | undefined`, guaranteeing your custom components match standard browser specifications.

* **Extreme Portability**: If you decide to transition your underlying custom element from a `'button'` to an `'a'` (anchor tag), you only need to change the string element parameter in a single location: `React.ComponentProps<'a'>['onClick']`.

---

### Comparison of Typings

| Event Type | Direct React Handler Type | Indexed Access Extraction Pattern |
| :--- | :--- | :--- |
| **Click (Button)** | `React.MouseEventHandler<HTMLButtonElement>` | `React.ComponentProps<'button'>['onClick']` |
| **Change (Input)** | `React.ChangeEventHandler<HTMLInputElement>` | `React.ComponentProps<'input'>['onChange']` |
| **Submit (Form)** | `React.FormEventHandler<HTMLFormElement>` | `React.ComponentProps<'form'>['onSubmit']` |

---

## 6. Advanced Prop Types & Component Patterns

### A. Passing Components as Props (Custom Icon Pattern)
This pattern is popular in component libraries for passing custom icon components while maintaining control over styling.

#### 1. Using `React.ComponentType`
Use `React.ComponentType` when you want the prop to accept a React component that takes specific internal properties (like an optional tailwind `className`):

```typescript
import React from 'react';

interface IconButtonProps {
  label: string;
  // Enforces that the component passed accepts an optional className
  icon: React.ComponentType<{ className?: string }>;
  // Can also use React.ReactElement for the same
}

export const IconButton = ({ label, icon: Icon }: IconButtonProps) => {
  return (
    <button className="flex items-center gap-2">
      {label}
      <Icon className="w-4 h-4" /> {/* Standardized styling applied internally */}
    </button>
  );
};
```

#### 2. Using `React.ElementType`
If you want to permit standard HTML element string tags (such as `'div'` or `'span'`) as well as React components, use **`React.ElementType`**.

---

### B. Discriminated Unions for Dynamic/Conditional Props
Use Discriminated Unions when a component's valid props depend on the value of a key prop. 

#### Example: Dynamic Modal Props
* If the modal type is `'confirm'`, a `confirmButtonMessage` **must** be required.
* If the modal type is `'alert'`, the `confirmButtonMessage` **should not** exist.

```typescript
interface AlertProps {
  type: 'alert';
  title: string;
}

interface ConfirmProps {
  type: 'confirm';
  title: string;
  confirmButtonMessage: string; // Required only here
}

type ModalProps = 
  | { type: 'alert'; title: string }
  | { type: 'confirm'; title: string; confirmButtonMessage: string };

// OR

type ModalProps = AlertProps | ConfirmProps;

export const Modal = (props: ModalProps) => {
  if (props.type === 'confirm') {
    // TypeScript automatically narrows props to ConfirmProps
    return <button>{props.confirmButtonMessage}</button>;
  }
  return <div>{props.title}</div>;
};
```
This compile-time safety prevents developers from passing invalid combinations of parameters to your components. Also when we pass the `props` to the `Modal` component, TypeScript will automatically infer the correct shape of the props based on the `type` value `i.e` if we pass `type: 'confirm'`, it will require `confirmButtonMessage` to be present, and if we pass `type: 'alert'`, it will not allow `confirmButtonMessage` to be passed.

---

### C. Generics in React Components
Generics let you create flexible, reusable components (like data tables or dropdowns) that handle dynamic data shapes without resorting to `any`.

#### Example: Generic Table Component
```typescript
interface TableProps<T> {
  data: T[];
  onRowClick: (row: T) => void;
}

// In .tsx, use '<T extends any>' or '<T,>' to prevent the compiler from 
// mistaking the generic brackets for opening HTML tags.
export const Table = <T extends any>({ data, onRowClick }: TableProps<T>) => {
  return (
    <table>
      {data.map((item, index) => (
        <tr key={index} onClick={() => onRowClick(item)}>
          <td>{JSON.stringify(item)}</td>
        </tr>
      ))}
    </table>
  );
};

// Usage:
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
<Table data={users} onRowClick={(user) => console.log(user.name)} />;
```
Whenever this component is used, TypeScript automatically infers the shape of `T` based on the data array, providing full autocompletion inside `onRowClick`.

---

## 7. Typing React Hooks

### A. `useState`
1. **Inference**: TypeScript infers primitive types automatically from default values:
   ```typescript
   const [active, setActive] = useState(false); // Inferred as: boolean
   ```
2. **Generics**: For empty initial states or complex shapes, pass a type argument:
   ```typescript
   const [user, setUser] = useState<User | null>(null); // Inferred as: User | null
   ```
3. **Empty Arrays**: Always type empty arrays explicitly to avoid them defaulting to `never[]`:
   ```typescript
   const [list, setList] = useState<string[]>([]); // Inferred as: string[]
   ```
4. **Type Assertion (`as`) Caution**:
   ```typescript
   const [user, setUser] = useState<User>({} as User);
   ```
   *Warning:* Asserting `{}` as your user is a type-level lie. Although it bypasses early `null` checks, it can cause immediate runtime crashes if the component attempts to read properties like `user.id` before the state is populated.

---

### B. `useRef`
The behavior of `useRef` shifts completely depending on your initial default value.

```typeScript
export function RefDemo() {
  // 1. DOM Ref: Must provide exact HTML element type and initialize with null
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Mutable Value Ref: Initialized with initial value directly
  const timerRef = useRef<number>(0);

  useEffect(() => {
    // Read-only DOM ref requires optional chaining or null check
    inputRef.current?.focus();

    // Mutable ref can be directly assigned
    timerRef.current = window.setInterval(() => {}, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return <input ref={inputRef} />;
}
```

1. **Standard Values (Mutable container)**:
   ```typescript
   const countRef = useRef<number>(); // Mutable current value: number | undefined
   ```
2. **DOM Element Refs (Managed by React)**:
   Always initialize DOM element refs with **`null`**:
   ```typescript
   const divRef = useRef<HTMLDivElement>(null); // Safe read-only element ref
   ```
   * **Why `null` is mandatory**: If you initialize with `undefined` or omit the argument, TypeScript types the `.current` property as read-only. Passing `null` signals to React: *"I am letting you take care of this reference."*
   * Ensure that the exact native element is specified (e.g., `HTMLButtonElement` or `HTMLDivElement`), otherwise TypeScript will warn of type mismatch.

---

### C. `useReducer`
Use Discriminated Unions for actions to get full autocomplete and strict type safety inside reducer switch statements.

```typescript
type State = { count: number; text: string };

type Action =
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'SET_TEXT'; payload: string };

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + action.payload };
    case 'DECREMENT':
      return { ...state, count: state.count - action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
  }
}
```

---

### D. `useContext` (The Provider Wrapper Pattern)
Always initialize context with `null` if a default value cannot be provided at creation time, then throw a custom hook error to enforce safe consumption.

```typescript
const UserContext = React.createContext<User | null>(null);
```
This forces you to write `if (user === null)` checks in every single component that imports the context.

#### The Hook Wrapper Solution:
Instead, export a custom hook that checks for `null` in one place and throws a clear error if the component is outside its Provider:

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  login: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const login = (name: string) => setUser(name);

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
}

// Custom hook guarantees non-null context context execution
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Context type is AuthContextType (null is stripped)
}
```

---

### E. `useMemo` & `useCallback`
Type inference handles returns accurately. Type callback parameters inline directly.

```typescript
// Inferred as number
const doubledCount = useMemo(() => count * 2, [count]);

// Inferred as (id: string) => void
const handleDelete = useCallback((id: string) => {
  apiDelete(id);
}, []);
```

---

## 8. Custom Hooks & Tuple Returns
When writing custom hooks that return a React state tuple (like `[state, setState]`), TypeScript naturally infers the return as an array of union types rather than a precise tuple.

### The Issue
```typescript
function useMyHook() {
  const [val, setVal] = useState(0);
  return [val, setVal]; // Inferred type: (number | Dispatch<SetStateAction<number>>)[]
}
```

### The Solutions
* **Solution 1: `as const`**: Mark the return statement with `as const`. This tells TypeScript to treat the return as a read-only tuple of exact indexed types:
  ```typescript
  return [val, setVal] as const;
  ```
* **Solution 2: Explicit Annotation**: Define the tuple in the hook signature:
  ```typescript
  function useMyHook(): [number, Dispatch<SetStateAction<number>>] { ... }
  ```

---

## 9. Ref Forwarding (`React.forwardRef`)
Typing `React.forwardRef` is unique because the generic parameters are passed in the **reverse order** of the function's arguments.

\\[\text{Generics: } \langle\text{DOM Element Type, Component Props}\rangle \quad \longleftrightarrow \quad \text{Arguments: } \text{(props, ref)}\\]

```typescript
interface InputProps {
  placeholder?: string;
}

// 1st Generic: The DOM element ref type (HTMLInputElement)
// 2nd Generic: The component props interface (InputProps)
export const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...props }, ref) => {
    return <input ref={ref} placeholder={placeholder} {...props} />;
  }
);

CustomInput.displayName = 'CustomInput'; // Essential for React DevTools
```

---
