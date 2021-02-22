import { Result } from "./result.ts";

/**
 * Converts `this` into antoher value.
 * 
 * This ensures that a value **will** be returned when converting. If it's not
 * guaranteed that this will happen, prefer to use `TryInto` which will return
 * a `Result`.
 * 
 * # Example
 * ```
 * class Sum implements Into<string | number, "string" | "number"> {
 *   a: number;
 *   b: number;
 * 
 *   constructor(a: number, b: number) {
 *     this.a = a;
 *     this.b = b;
 *   }
 *
 *   into(hint: "string" | "number"): string | number {
 *     if(hint === "string") return `${this.a} + ${this.b} = ${this.a + this.b}`;
 *     return this.a + this.b;
 *   }
 * }
 * 
 * const sum = new Sum(2, 3);
 * console.log(sum.into("number")); // > 5
 * console.log(sum.into("string")); // > 2 + 3 = 5
 * ```
 */
export abstract class Into<T, H extends string> {
  /**
   * Preforms the conversion of `this` into another value.
   * @param hint A hint used to know which value to convert into.
   */
  abstract into(this: this, hint: H): T;
}

/**
 * Converts `this` into antoher value.
 * 
 * This returns a `Result` which may or may not be successful. If the value is
 * guaranteed to return, prefer to use `Into` which will always return a value.
 * 
 * # Example
 * ```
 * class Sum implements TryInto<string | number, string, "string" | "number"> {
 *   a: number;
 *   b: number;
 * 
 *   constructor(a: number, b: number) {
 *     this.a = a;
 *     this.b = b;
 *   }
 * 
 *   try_into(hint: "string" | "number"): Result<string | number, string> {
 *     if(this.a + this.b >= 10) return { err: "number too big" };
 * 
 *     if(hint === "string") return { ok: `${this.a} + ${this.b} = ${this.a + this.b}` };
 *     return { ok: this.a + this.b };
 *   }
 * }
 * 
 * const sum = new Sum(2, 3);
 * console.log(sum.try_into("number")); // > { ok: 5 }
 * console.log(sum.try_into("string")); // > { ok: 2 + 3 = 5 }
 * 
 * sum.a = 50;
 * console.log(sum.try_into("number")); // > { err: "number too big" }
 * console.log(sum.try_into("string")); // > { err: "number too big" }
 * ```
 */
export abstract class TryInto<T, E, H extends string> {
  /**
   * Tries to preform the conversion of `this` into another value.
   * @param hint A hint used to know which value to try to convert into.
   */
  abstract try_into(this: this, hint: H): Result<T, E>;
}

// TODO(leonskidev): typescript doesn't allow "abstract static" (for some stupid
// reason), try and find a temp solution

// /**
//  * Converts antoher value into `self`.
//  * 
//  * This ensures that a value **will** be returned when converting. If it's not
//  * guaranteed that this will happen, prefer to use `TryFrom` which will return
//  * a `Result`.
//  */
// export abstract class From<T, H extends string> {
//   abstract from(value: T, hint: H): this;
// }