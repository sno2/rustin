import { assertEquals, assertThrows } from "./deps.ts";
import { result } from "../mod.ts";

const ok: result.Ok<number> = { ok: 50 };
const err: result.Err<string> = { err: "some error" };

// is_ok_ok
Deno.test({
  name: "is_ok_ok",
  fn() { assertEquals(result.isOk(ok), true); }
});

// is_ok_err
Deno.test({
  name: "is_ok_err",
  fn() { assertEquals(result.isOk(err), false); }
});

// is_err_ok
Deno.test({
  name: "is_err_ok",
  fn() { assertEquals(result.isErr(ok), false); }
});

// is_err_err
Deno.test({
  name: "is_err_err",
  fn() { assertEquals(result.isErr(err), true); }
});

// ok_ok
Deno.test({
  name: "ok_ok",
  fn() { assertEquals(result.ok(ok), 50); }
});

// ok_err
Deno.test({
  name: "ok_err",
  fn() { assertEquals(result.ok(err), null); }
});

// err_ok
Deno.test({
  name: "err_ok",
  fn() { assertEquals(result.err(ok), null); }
});

// err_err
Deno.test({
  name: "err_ok",
  fn() { assertEquals(result.err(err), "some error"); }
});

// contains_ok_valid
Deno.test({
  name: "contains_ok_valid",
  fn() { assertEquals(result.contains(ok, 50), true); }
});

// contains_ok_invalid
Deno.test({
  name: "contains_ok_invalid",
  fn() { assertEquals(result.contains(ok, 25), false); }
});

// contains_err_valid
Deno.test({
  name: "contains_err_valid",
  fn() { assertEquals(result.containsErr(err, "some error"), true); }
});

// contains_err_invalid
Deno.test({
  name: "contains_err_invalid",
  fn() { assertEquals(result.containsErr(err, "some other error"), false); }
});

// unwrap_ok
Deno.test({
  name: "unwrap_ok",
  fn() { assertEquals(result.unwrap(ok), 50); }
});

// unwrap_err
Deno.test({
  name: "unwrap_err",
  fn() { assertThrows(() => result.unwrap(err)); }
});

// expect_ok
Deno.test({
  name: "expect_ok",
  fn() { assertEquals(result.expect(ok, "some error"), 50); }
});

// expect_err
Deno.test({
  name: "expect_err",
  fn() { assertThrows(() => result.expect(err, "some error")); }
});