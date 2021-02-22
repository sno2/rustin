import { assertEquals, assertThrows } from "./deps.ts";
import { option } from "../mod.ts";

const some: option.Some<number> = 50;
const none: option.None = null;

// is_some_some
Deno.test({
  name: "is_some_some",
  fn() { assertEquals(option.isSome(some), true); }
});

// is_some_none
Deno.test({
  name: "is_some_none",
  fn() { assertEquals(option.isSome(none), false); }
});

// is_none_some
Deno.test({
  name: "is_none_some",
  fn() { assertEquals(option.isNone(some), false); }
});

// is_none_none
Deno.test({
  name: "is_none_none",
  fn() { assertEquals(option.isNone(none), true); }
});

// contains_some_valid
Deno.test({
  name: "contains_some_valid",
  fn() { assertEquals(option.contains(some, 50), true); }
});

// contains_some_invalid
Deno.test({
  name: "contains_some_invalid",
  fn() { assertEquals(option.contains(some, 25), false); }
});

// contains_none_valid
Deno.test({
  name: "contains_none_valid",
  fn() { assertEquals(option.contains(none, 50), false); }
});

// contains_none_invalid
Deno.test({
  name: "contains_none_invalid",
  fn() { assertEquals(option.contains(none, 25), false); }
});

// unwrap_some
Deno.test({
  name: "unwrap_some",
  fn() { assertEquals(option.unwrap(some), 50); }
});

// unwrap_none
Deno.test({
  name: "unwrap_none",
  fn() { assertThrows(() => option.unwrap(none)); }
});

// expect_some
Deno.test({
  name: "expect_some",
  fn() { assertEquals(option.expect(some, "some error"), 50); }
});

// expect_none
Deno.test({
  name: "expect_none",
  fn() { assertThrows(() => option.expect(none, "some error")); }
});