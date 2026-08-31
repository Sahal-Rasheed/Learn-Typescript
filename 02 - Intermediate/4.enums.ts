// Enums in TypeScript
// Enums are a way to define a set of named constants in TypeScript. They allow you to define a collection of related values that can be used as a type.
// Enums are similar to named types, but they are more flexible and can be used in a wider range of scenarios. Enums can be numeric or string-based, and they can also have computed values.
// In Enums, the value before `=` is the name of the constant, and the value after `=` is the value of the constant. 

// Numeric Enums
enum Direction {
  Up,        // 0
  Down,      // 1
  Left,      // 2
  Right      // 3
}

let move: Direction = Direction.Up;  // move is of type Direction and can only take on the values defined in the Direction enum

// String Enums
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}

let currentStatuss: Status = Status.Active;  // currentStatuss is of type Status and can only take on the values defined in the Status enum

// Heterogeneous Enums (mixing numeric and string values)
enum MixedEnum {
  No = 0,
  Yes = "YES"
}

let answer: MixedEnum = MixedEnum.Yes;  // answer is of type MixedEnum and can only take on the values defined in the MixedEnum enum

// Computed Enums
enum ComputedEnum {
  A = 1,
  B = A * 2,  // B will be 2
  C = B + 3   // C will be 5
}

let computedValue: ComputedEnum = ComputedEnum.C;  // computedValue is of type ComputedEnum and can only take on the values defined in the ComputedEnum enum
