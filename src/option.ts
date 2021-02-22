/** Represents some value. */
export type Some<T> = T;
/** Represents no value. */
export type None = null | undefined;
/** Represents either some value (`Some`) or no value (`None`). */
export type Option<T> = Some<T> | None;

/** Returns `true` if the option is a `Some` value. */
export function isSome<T>(self: Option<T>): boolean {
  if(typeof(self) !== "undefined" && self !== null) return true;
  return false;
}

/** Returns `true` if the option is a `None` value. */
export function isNone<T>(self: Option<T>): boolean {
  return !isSome(self);
}

/** Returns `true` if the option is a `Some` value containing the given value. */
export function contains<T>(self: Option<T>, value: T): boolean {
  if(isSome(self) && self === value) return true;
  return false;
}

/**
 * Returns the contained `Some` value.
 * 
 * Because this function may panic, its use is generally discouraged. Instead,
 * prefer to handle the `None` case explicitly.
 * 
 * # Panics
 * Panics if the value equals `None`.
 */
export function unwrap<T>(self: Option<T>): T {
  if(isSome(self)) return self as Some<T>;
  throw new TypeError(
    `called \`unwrap()\` on a \`None\` value`
  );
}

/**
 * Returns the contained `Some` value.
 * 
 * # Panics
 * Panics if the value is a `None` with a custom panic message provided by `msg`.
 */
export function expect<T>(self: Option<T>, msg: string): T {
  if(isSome(self)) return self as Some<T>;
  throw new TypeError(`${msg}`);
}