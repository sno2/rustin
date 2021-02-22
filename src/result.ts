import { option } from "../mod.ts";

/** Represents a success. */
export type Ok<T> = { ok: T };
/** Represents a failure. */
export type Err<E> = { err: E };
/** Represents either a success (`Ok`) or failure (`Err`). */
export type Result<T, E> = Ok<T> | Err<E>;

/** Returns `true` if a result is `Ok`. */
export function isOk<T, E>(self: Result<T, E>): boolean {
  if((self as Ok<T>).ok !== undefined) return true;
  return false;
}

/** Returns `true` if a result is `Err`. */
export function isErr<T, E>(self: Result<T, E>): boolean {
  return !isOk(self);
}

/**
 * Converts from `Result<T, E>` to `Option<T>`.
 * 
 * Converts `self` into an `Option<T>`, discarding the error, if any.
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
 */
export function err<T, E>(self: Result<T, E>): option.Option<E> {
  if(isErr(self)) return (self as Err<E>).err as option.Some<E>;
  return null as option.None;
}

/** Returns `true` if the result is an `Ok` value containing the given value. */
export function contains<T, E>(self: Result<T, E>, value: T): boolean {
  if(isOk(self) && (self as Ok<T>).ok === value) return true;
  return false;
}

/** Returns `true` if the result is an `Err` value containing the given value. */
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
 * # Panics
 * Panics if the value is an `Err`, with a panic message provided by the `Err`'s
 * value.
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
 * # Panics
 * Panics if the value is an `Err`, with a panic message including the passed
 * message, and the content of the `Err`.
 */
export function expect<T, E>(self: Result<T, E>, msg: string): T {
  if(isOk(self)) return (self as Ok<T>).ok;
  throw new TypeError(`${msg}: "${(self as Err<E>).err}"`);
}