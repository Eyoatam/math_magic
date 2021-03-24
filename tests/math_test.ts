import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { Magic } from "../src/math.ts";

Deno.test("Test compute2Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute2Digit(5), { computedValue: 4 });
  const { computedValue } = math.compute2Digit(6);
  assertStrictEquals(computedValue, 3);
});

Deno.test("Test compute3Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute3Digit(2), { firstValue: 9, secondValue: 7 });
  const { firstValue, secondValue } = math.compute3Digit(4);
  assertStrictEquals(firstValue, 9);
  assertStrictEquals(secondValue, 5);
});

Deno.test("Test compute4Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute4Digit(51), { firstValue: 7, secondValue: 5 });
  const { firstValue, secondValue } = math.compute4Digit(52);
  assertStrictEquals(firstValue, 6);
  assertStrictEquals(secondValue, 5);
});

Deno.test("Test for compute5Digit Method", () => {
  const math = new Magic();
  assertEquals(math.compute5Digit(61), {
    firstValue: 9,
    secondValue: 7,
    thirdValue: 4,
  });
  const { firstValue, secondValue, thirdValue } = math.compute5Digit(62);
  assertStrictEquals(firstValue, 9);
  assertStrictEquals(secondValue, 6);
  assertStrictEquals(thirdValue, 4);
});

Deno.test("Test for compute6Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute6Digit(530), {
    firstValue: 8,
    secondValue: 6,
    thirdValue: 5,
  });
  const { firstValue, secondValue, thirdValue } = math.compute6Digit(531);
  assertStrictEquals(firstValue, 7);
  assertStrictEquals(secondValue, 6);
  assertStrictEquals(thirdValue, 5);
});
