import { assertEquals } from "./deps.ts";
import { convert, result } from "../mod.ts";

class Sum implements
  convert.Into<[number, number] | string, "numbers" | "string">,
  convert.TryInto<boolean | number, string, "boolean" | "number">
{
  num1: number;
  num2: number;

  constructor(num1: number, num2: number) {
    this.num1 = num1;
    this.num2 = num2;
  }

  into(hint: "numbers" | "string"): [number, number] | string {
    if(hint === "numbers") return [this.num1, this.num2];
    return `${this.num1} + ${this.num2} = ${this.num1 + this.num2}`;
  }

  try_into(hint: "boolean" | "number"): result.Result<boolean | number, string> {
    if(hint === "boolean") {
      const sum = this.num1 + this.num2;

      if(sum === 1 || sum === 0) return { ok: true };
      else return { err: "number below 0 or above 1" };
    }
    return { ok: this.num1 + this.num2 };
  }
}

const sum = new Sum(2, 3);

// into_number
Deno.test({
  name: "into_number",
  fn() { assertEquals(sum.into("numbers"), [2, 3]); }
});

// into_string
Deno.test({
  name: "into_string",
  fn() { assertEquals(sum.into("string"), `2 + 3 = 5`); }
});

// try_into_number_ok
Deno.test({
  name: "try_into_number_ok",
  fn() { assertEquals(sum.try_into("number"), { ok: 5 }); }
});

// try_into_boolean_err
Deno.test({
  name: "try_into_boolean_err",
  fn() { assertEquals(sum.try_into("boolean"), { err: "number below 0 or above 1" }); }
});