import { parse } from "https://deno.land/std@0.91.0/flags/mod.ts";
import { brightGreen, green } from "https://deno.land/std@0.91.0/fmt/colors.ts";
import { Magic } from "./src/magic.ts";
const parsedArgs = parse(Deno.args);

// TODO(Eyoatam): improve cli

if (parsedArgs.help || parsedArgs.h || parsedArgs.length === 0) {
  console.log(`
  Usage: cli.ts --option [number]

  options: --two [number] - compute two digit number
           --three [number] - compute three digit number
           --four [number] -  compute four digit number
           --five [number] - compute five digit number
  `);
}

const math = new Magic();

if (typeof parsedArgs.two === "number") {
  const { computedValue, num } = math.compute2Digit(+parsedArgs.two);
  console.log("Your number is " + green(num + computedValue.toString()));
} else if (parsedArgs.two && typeof parsedArgs.two !== "number") {
  const number = prompt(brightGreen("? ") + "The first number:");
  if (number) {
    const { computedValue, num } = math.compute2Digit(+number);
    console.log("Your number is " + green(num + computedValue.toString()));
  }
}

if (typeof parsedArgs.three === "number") {
  const { firstValue, secondValue, num } = math.compute3Digit(
    +parsedArgs.three,
  );
  console.log(
    "Your number is " +
      green(num + firstValue.toString() + secondValue.toString()),
  );
} else if (parsedArgs.three && typeof parsedArgs.three !== "number") {
  const number = prompt(brightGreen("? ") + "The first number:");
  if (number) {
    const { firstValue, secondValue, num } = math.compute3Digit(+number);
    console.log(
      "Your number is " +
        green(num + firstValue.toString() + secondValue.toString()),
    );
  }
}

if (typeof parsedArgs.four === "number") {
  const { firstValue, secondValue, num } = math.compute4Digit(+parsedArgs.four);
  console.log(
    "Your number is " +
      green(num + firstValue.toString() + secondValue.toString()),
  );
} else if (parsedArgs.four && typeof parsedArgs.four !== "number") {
  const number = prompt(brightGreen("? ") + " The first two numbers:");
  if (number) {
    const { firstValue, secondValue, num } = math.compute4Digit(+number);
    console.log(
      "Your number is " +
        green(num + firstValue.toString() + secondValue.toString()),
    );
  }
}

if (typeof parsedArgs.five === "number") {
  const { firstValue, secondValue, thirdValue, num } = math.compute5Digit(
    +parsedArgs.five,
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
} else if (parsedArgs.five && typeof parsedArgs.five !== "number") {
  const number = prompt(brightGreen("? ") + " The first two numbers:");
  if (number) {
    const { firstValue, secondValue, thirdValue, num } = math.compute5Digit(
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

if (typeof parsedArgs.six === "number") {
  const { firstValue, secondValue, thirdValue, num } = math.compute6Digit(
    +parsedArgs.six,
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
} else if (parsedArgs.six && typeof parsedArgs.six !== "number") {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number) {
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

if (typeof parsedArgs.seven === "number") {
  const {
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
    num,
  } = math.compute7Digit(+parsedArgs.seven);
  console.log(
    "Your number is " +
      green(
        num +
          firstValue.toString() +
          secondValue.toString() +
          thirdValue.toString() +
          fourthValue.toString(),
      ),
  );
} else if (parsedArgs.seven && typeof parsedArgs.seven !== "number") {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number) {
    const {
      firstValue,
      secondValue,
      thirdValue,
      fourthValue,
      num,
    } = math.compute7Digit(+number);
    console.log(
      "Your number is " +
        green(
          num +
            firstValue.toString() +
            secondValue.toString() +
            thirdValue.toString() +
            fourthValue.toString(),
        ),
    );
  }
}

if (typeof parsedArgs.eight === "number") {
  const {
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
    num,
  } = math.compute8Digit(+parsedArgs.eight);
  console.log(
    "Your number is " +
      green(
        num +
          firstValue.toString() +
          secondValue.toString() +
          thirdValue.toString() +
          fourthValue.toString(),
      ),
  );
} else if (parsedArgs.eight && typeof parsedArgs.eight !== "number") {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number) {
    const {
      firstValue,
      secondValue,
      thirdValue,
      fourthValue,
      num,
    } = math.compute8Digit(+number);
    console.log(
      "Your number is " +
        green(
          num +
            firstValue.toString() +
            secondValue.toString() +
            thirdValue.toString() +
            fourthValue.toString(),
        ),
    );
  }
}

if (typeof parsedArgs.nine === "number") {
  const {
    firstValue,
    secondValue,
    thirdValue,
    fourthValue,
    fifthValue,
    num,
  } = math.compute9Digit(+parsedArgs.nine);
  console.log(
    "Your number is " +
      green(
        num +
          firstValue.toString() +
          secondValue.toString() +
          thirdValue.toString() +
          fourthValue.toString() +
          fifthValue.toString(),
      ),
  );
} else if (parsedArgs.nine && typeof parsedArgs.nine !== "number") {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number) {
    const {
      firstValue,
      secondValue,
      thirdValue,
      fourthValue,
      fifthValue,
      num,
    } = math.compute9Digit(+number);
    console.log(
      "Your number is " +
        green(
          num +
            firstValue.toString() +
            secondValue.toString() +
            thirdValue.toString() +
            fourthValue.toString() +
            fifthValue.toString(),
        ),
    );
  }
}
