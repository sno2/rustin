import { option } from "../mod.ts";

/**
 * Represents a success.
 * 
 * ## Example
 * ```
 * const ok: Ok<number> = { ok: 50 };
 * ```
 */
export type Ok<T> = { ok: T };
/**
 * Represents a failure.
 * 
 * ## Example
 * ```
 * const err: Err<string> = { err: "some error" };
 * ```
 */
export type Err<E> = { err: E };
/**
 * Represents either a success (`Ok`) or failure (`Err`).
 * 
 * ## Examples
 * `Ok` (success value):
 * ```
 * const ok: Ok<number> = { ok: 50 };
 * ```
 * `Err` (error value):
 * ```
 * const err: Err<string> = { err: "some error" };
 * ```
 */
export type Result<T, E> = Ok<T> | Err<E>;

// deno-lint-ignore no-namespace
export namespace Result {
  /**
   * Returns `true` if a result is `Ok`.
   * 
   * ## Example
   * ```
   * const ok: Ok<number> = { ok: 50 };
   * console.log(result.isOk(ok)); // true
   * ```
   */
  export function isOk<T, E>(self: Result<T, E>): boolean {
    if((self as Ok<T>).ok !== undefined) return true;
    return false;
  }

  /**
   * Returns `true` if a result is `Err`.
   * 
   * ## Example
   * ```
   * const err: Err<string> = { err: "some error" };
   * console.log(result.isErr(err)); // true
   * ```
   */
  export function isErr<T, E>(self: Result<T, E>): boolean {
    return !isOk(self);
  }

  /**
   * Converts from `Result<T, E>` to `Option<T>`.
   * 
   * Converts `self` into an `Option<T>`, discarding the error, if any.
   * 
   * ## Example
   * ```
   * const ok: Ok<number> = { ok: 50 };
   * console.log(result.ok(ok)); // 50
   * console.log(result.err(ok)); // null
   * ```
   */
  export function ok<T, E>(self: Result<T, E>): option.Option<T> {
    if(isOk(self)) return (self as Ok<T>).ok as option.Some<T>;
    return null as option.None;
  }

  /**
   * Converts from `Result<T, E>` to `Option<E>`.
   * 
   * Converts `self` into an `Option<E>`, discarding the success value,
   * if any.
   * 
   * ## Example
   * ```
   * const err: Err<string> = { err: "some error" };
   * console.log(result.err(err)); // "some error"
   * console.log(result.ok(err)); // null
   * ```
   */
  export function err<T, E>(self: Result<T, E>): option.Option<E> {
    if(isErr(self)) return (self as Err<E>).err as option.Some<E>;
    return null as option.None;
  }

  /**
   * Returns `true` if the result is an `Ok` value containing the given value.
   * 
   * ## Example
   * ```
   * const ok: Ok<number> = { ok: 50 };
   * const err: Err<string> = { err: "some error" };
   * 
   * console.log(result.contains(ok, 50)); // true
   * console.log(result.contains(ok, 25)); // false
   * console.log(result.contains(err, 50)); // false
   * ```
   */
  export function contains<T, E>(self: Result<T, E>, value: T): boolean {
    if(isOk(self) && (self as Ok<T>).ok === value) return true;
    return false;
  }

  /**
   * Returns `true` if the result is an `Err` value containing the given value.
   * 
   * ## Example
   * ```
   * const ok: Ok<number> = { ok: 50 };
   * const err: Err<string> = { err: "some error" };
   * 
   * console.log(result.containsErr(err, "some error")); // true
   * console.log(result.containsErr(err, 50)); // false
   * console.log(result.containsErr(ok, "some error")); // false
   * ```
   */
  export function containsErr<T, E>(self: Result<T, E>, value: E): boolean {
    if(isErr(self) && (self as Err<E>).err === value) return true;
    return false;
  }

  /**
   * Returns the contained `Ok` value.
   * 
   * Because this function may panic, its use is generally discouraged. Instead,
   * prefer to handle the `Err` case explicitly.
   * 
   * ## Throws
   * Throws if the value is an `Err`, with a panic message provided by the `Err`'s
   * value.
   * 
   * ## Example
   * ```
   * const ok: Ok<number> = { ok: 50 };
   * console.log(result.unwrap(ok)); // 50
   * 
   * const err: Err<string> = { err: "some error" };
   * console.log(result.unwrap(err)); // throws
   * ```
   */
  export function unwrap<T, E>(self: Result<T, E>): T {
    if(isOk(self)) return (self as Ok<T>).ok;
    throw new TypeError(
      `called \`:unwrap()\` on an \`Err\` value: "${(self as Err<E>).err}"`
    );
  }

  /**
   * Returns the contained `Ok` value.
   * 
   * ## Throws
   * Throws if the value is an `Err`, with a panic message including the passed
   * message, and the content of the `Err`.
   * 
   * ## Example
   * ```
   * const ok: Ok<number> = { ok: 50 };
   * console.log(result.expect(ok, "whoops")); // 50
   * 
   * const err: Err<string> = { err: "some error" };
   * console.log(result.expect(err, "whoops")); // throws with custom message
   * ```
   */
  export function expect<T, E>(self: Result<T, E>, msg: string): T {
    if(isOk(self)) return (self as Ok<T>).ok;
    throw new TypeError(`${msg}: "${(self as Err<E>).err}"`);
  }
}