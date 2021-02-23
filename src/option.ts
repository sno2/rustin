/**
 * Represents some value.
 *
 * ## Example
 * ```
 * const some: Some<number> = 50;
 * ```
 */
export type Some<T> = T;
/**
 * Represents no value.
 *
 * ## Example
 * ```
 * const none: None = null;
 * ```
 */
export type None = null | undefined;
/**
 * Represents either some value (`Some`) or no value (`None`).
 *
 * ## Examples
 * `Some` (some value):
 * ```
 * const some: Some<number> = 50;
 * ```
 * `None` (no value):
 * ```
 * const none: None = null;
 * ```
 */
export type Option<T> = Some<T> | None;

// deno-lint-ignore no-namespace
export namespace Option {
  /**
   * Returns `true` if the option is a `Some` value.
   *
   * ## Example
   * ```
   * const some: Some<number> = 50;
   * console.log(option.isSome(some)); // true
   * ```
   */
  export function isSome<T>(self: Option<T>): self is Some<T> {
    return self !== undefined && self !== null;
  }

  /**
   * Returns `true` if the option is a `None` value.
   *
   * ## Example
   * ```
   * const none: None = null;
   * console.log(option.isNone(none)); // true
   * ```
   */
  export function isNone<T>(self: Option<T>): self is None {
    return !isSome(self);
  }

  /**
   * Returns `true` if the option is a `Some` value containing the given value.
   *
   * ## Example
   * ```
   * const some: Some<number> = 50;
   * const none: None = null;
   *
   * console.log(option.contains(some, 50)); // true
   * console.log(option.contains(some, 100)); // false
   * console.log(option.contains(none, 50); // false
   * ```
   */
  export function contains<T>(self: Option<T>, value: T): boolean {
    return isSome(self) && self === value;
  }

  /**
   * Returns the contained `Some` value.
   *
   * Because this function may panic, its use is generally discouraged. Instead,
   * prefer to handle the `None` case explicitly.
   *
   * ## Throws
   * Throws if the value equals `None`.
   *
   * ## Example
   * ```
   * const some: Some<number> = 50;
   * console.log(option.unwrap(some)); // 50
   *
   * const none: None = null;
   * console.log(option.unwrap(none)); // throws
   * ```
   */
  export function unwrap<T>(self: Option<T>): T {
    if (isSome(self)) return self as Some<T>;
    throw new TypeError(`called \`unwrap()\` on a \`None\` value`);
  }

  /**
   * Returns the contained `Some` value.
   *
   * ## Throws
   * Throws if the value is a `None` with a custom panic message provided by `msg`.
   *
   * ## Example
   * ```
   * const some: Some<number> = 50;
   * console.log(option.expect(some, "whoops")); // 50
   *
   * const none: None = null;
   * console.log(option.expect(none, "whoops")); // throws with custom message
   * ```
   */
  export function expect<T>(self: Option<T>, msg: string): T {
    if (isSome(self)) return self;
    throw new TypeError(msg);
  }
}
