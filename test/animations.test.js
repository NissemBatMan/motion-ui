import assert from "node:assert/strict";
import { test } from "node:test";
import { animations, withReducedMotion } from "../src/animations.js";

test("ids are unique and kebab-case", () => {
  const ids = animations.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z]+(-[a-z]+)*$/);
});

test("every snippet is self-contained (classes, keyframes and custom properties use its prefix)", () => {
  for (const { id, css, html } of animations) {
    const classes = [...css.matchAll(/\.([a-z][\w-]*)/g)].map((m) => m[1]);
    for (const name of classes) assert.ok(name.startsWith(id), `${id}: class .${name} must start with "${id}"`);

    const keyframes = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    for (const name of keyframes) assert.ok(name.startsWith(id), `${id}: @keyframes ${name} must start with "${id}"`);

    const animationNames = [...css.matchAll(/animation(?:-name)?:\s*([^;]+);/g)].flatMap((m) =>
      m[1].split(",").map((part) => part.trim().split(/\s+/)[0]),
    );
    for (const name of animationNames) assert.ok(keyframes.includes(name), `${id}: animation "${name}" has no @keyframes`);

    const customProps = [...css.matchAll(/(?:@property\s+|^\s*)(--[\w-]+)\s*[:{]/gm)].map((m) => m[1]);
    for (const name of customProps) assert.ok(name.startsWith(`--${id}`), `${id}: custom property ${name}`);

    assert.match(html, new RegExp(`class="${id}[" ]`), `${id}: HTML root must use the class .${id}`);
  }
});

test("braces are balanced", () => {
  for (const { id, css } of animations) {
    let depth = 0;
    for (const char of css) {
      if (char === "{") depth++;
      if (char === "}") depth--;
      assert.ok(depth >= 0, `${id}: unexpected }`);
    }
    assert.equal(depth, 0, `${id}: unclosed {`);
  }
});

test("animated snippets ship a reduced-motion rule", () => {
  for (const { id, css } of animations) {
    const out = withReducedMotion(css, id);
    assert.ok(out.includes("prefers-reduced-motion: reduce"));
    assert.ok(out.includes(`.${id}`));
  }
});

test("interactive demos are accessible", () => {
  for (const { id, html } of animations) {
    if (/role="status"/.test(html)) assert.match(html, /aria-label="/, `${id}: status needs a label`);
    if (/<svg/.test(html)) assert.match(html, /aria-(label|hidden)/, `${id}: svg needs a label or aria-hidden`);
  }
});
