🦕 Rustin deno, need I say more? 🦕

## Why?
Rust provides a super useful [core] crate which we should use to our advantage. While this can make our code more verbose, it ensures that we also don't end up with a mess in the end.

Yep typescript is a big help for some things, this just adds that little bit of extra on top.

## Goal
The goal of rustin is **not** to replicate the [core] crate in its entirety, this wouldn't be too useful. It's also **not** to copy each rust [core] feature exactly as it is, that wouldn't be very idiomatic.

Instead, what this **is**, is an attempt to bring some rust [core] crate features that:

- make sense
- are useful
- fit the language

to typescript + javascript.

They may come with more or less features the rust [core] counterpart, have different workings, and in super rare cases have different names (if they overlap with existing typescript / javascript types).

Personally, I'd like this to be something that is super easy to use alongside the rest of your code-base, so much so that you forget you're even using it.

## Docs
Instead of a long list of what you can do here, I'll point you to the [docs]. There's a much nicer layout, examples, and proper styling.

## Tests
Everything, in true Rust fashion, comes complete with a test to make sure:

- it works
- there's no regression

If you make a pull request, which is more than welcome, please try to include tests for the things you add. Thanks!

[docs]: https://doc.deno.land/https/deno.land/x/rustin/mod.ts
[core]: https://doc.rust-lang.org/core/index.html