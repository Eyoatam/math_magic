import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { Magic } from "../src/magic.ts";

Deno.test("Test compute2Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute2Digit(5), { computedValue: 4, num: 5 });
  const { computedValue } = math.compute2Digit(6);
  assertStrictEquals(computedValue, 3);
});

Deno.test("Test compute3Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute3Digit(2), {
    firstValue: 9,
    secondValue: 7,
    num: 2,
  });
  const { firstValue, secondValue } = math.compute3Digit(4);
  assertStrictEquals(firstValue, 9);
  assertStrictEquals(secondValue, 5);
});

Deno.test("Test compute4Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute4Digit(51), {
    firstValue: 7,
    secondValue: 5,
    num: 51,
  });
  const { firstValue, secondValue } = math.compute4Digit(52);
  assertStrictEquals(firstValue, 6);
  assertStrictEquals(secondValue, 5);
});

Deno.test("Test compute5Digit Method", () => {
  const math = new Magic();
  assertEquals(math.compute5Digit(61), {
    firstValue: 9,
    secondValue: 7,
    thirdValue: 4,
    num: 61,
  });
  const { firstValue, secondValue, thirdValue } = math.compute5Digit(62);
  assertStrictEquals(firstValue, 9);
  assertStrictEquals(secondValue, 6);
  assertStrictEquals(thirdValue, 4);
});

Deno.test("Test compute6Digit method", () => {
  const math = new Magic();
  assertEquals(math.compute6Digit(530), {
    firstValue: 8,
    secondValue: 6,
    thirdValue: 5,
    num: 530,
  });
  const { firstValue, secondValue, thirdValue } = math.compute6Digit(531);
  assertStrictEquals(firstValue, 7);
  assertStrictEquals(secondValue, 6);
  assertStrictEquals(thirdValue, 5);
});

Deno.test("Test compute7Digit Method", () => {
  const math = new Magic();
  assertEquals(math.compute7Digit(641), {
    firstValue: 9,
    secondValue: 7,
    thirdValue: 5,
    fourthValue: 4,
    num: 641,
  });
  const {
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
  } = math.compute7Digit(642);
  assertStrictEquals(firstValue, 9);
  assertStrictEquals(secondValue, 6);
  assertStrictEquals(thirdValue, 5);
  assertStrictEquals(fourthValue, 4);
});

Deno.test("Test compute8Digit Method", () => {
  const math = new Magic();
  assertEquals(math.compute8Digit(7530), {
    firstValue: 8,
    secondValue: 6,
    thirdValue: 4,
    fourthValue: 3,
    num: 7530,
  });
  const {
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
  } = math.compute8Digit(7531);
  assertStrictEquals(firstValue, 7);
  assertStrictEquals(secondValue, 6);
  assertStrictEquals(thirdValue, 4);
  assertStrictEquals(fourthValue, 3);
});

Deno.test("Test compute9DigitMethod", () => {
  const math = new Magic();
  assertEquals(math.compute9Digit(8641), {
    firstValue: 9,
    secondValue: 7,
    thirdValue: 5,
    fourthValue: 3,
    fifthValue: 2,
    num: 8641,
  });
  const {
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
    fifthValue,
  } = math.compute9Digit(8451);
  assertStrictEquals(firstValue, 9);
  assertStrictEquals(secondValue, 7);
  assertStrictEquals(thirdValue, 4);
  assertStrictEquals(fourthValue, 5);
  assertStrictEquals(fifthValue, 2);
});
