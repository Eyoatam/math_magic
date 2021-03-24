#!/usr/bin/env -S deno run --allow-read

import { parse } from "https://deno.land/std@0.91.0/flags/mod.ts";
import { brightGreen, green } from "https://deno.land/std@0.91.0/fmt/colors.ts";
import { Magic } from "./src/magic.ts";
const parsedArgs = parse(Deno.args);

if (parsedArgs.help || parsedArgs.h || parsedArgs._.length === 0) {
  console.log(`
    Flags: --two [number] - compute two digit number
           --three [number] - compute three digit number
           --four [number] -  compute four digit number
           --five [number] - compute five digit number
  `);
}

const math = new Magic();
if (parsedArgs.two) {
  const number = prompt(brightGreen("? ") + "The first number:");
  if (number !== null) {
    const { computedValue, num } = math.compute2Digit(+number);
    console.log("Your number is " + green(num + computedValue.toString()));
  }
}

if (parsedArgs.three) {
  const number = prompt(brightGreen("? ") + "The first number:");
  if (number !== null) {
    const { firstValue, secondValue, num } = math.compute3Digit(+number);
    console.log(
      "Your number is " +
        green(num + firstValue.toString() + secondValue.toString()),
    );
  }
}

if (parsedArgs.four) {
  const number = prompt(brightGreen("? ") + " The first two numbers:");
  if (number !== null) {
    const { firstValue, secondValue, num } = math.compute4Digit(+number);
    console.log(
      "Your number is " +
        green(num + firstValue.toString() + secondValue.toString()),
    );
  }
}

if (parsedArgs.five) {
  const number = prompt(brightGreen("? ") + " The first two numbers:");
  if (number !== null) {
    const { firstValue, secondValue, thirdValue, num } = math.compute5Digit(
      +number,
    );
    console.log(
      "Your number id " +
        green(
          num +
            firstValue.toString() +
            secondValue.toString() +
            thirdValue.toString(),
        ),
    );
  }
}

if (parsedArgs.six) {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number !== null) {
    const { firstValue, secondValue, thirdValue, num } = math.compute6Digit(
      +number,
    );
    console.log(
      "Your number is " +
        green(
          num +
            firstValue.toString() +
            secondValue.toString() +
            thirdValue.toString(),
        ),
    );
  }
}
