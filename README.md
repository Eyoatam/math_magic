# math_magic

[![codecov](https://codecov.io/gh/eyoatam/math_magic/branch/main/graph/badge.svg?token=w6s3ODtULz)](https://codecov.io/gh/eyoatam/math_magic)

> This repo contains some code of me playing around with math and deno

## Two digit trick

The first trick, first you take a two digit number and the numbers should be in descending format <br/>
for example `24` is not valid because 2 is greater than 4 but `42` is valid because 3 is greater than 2 <br/>

> these rules also apply to all of the rest tricks

then you subtract the inverse of the number example if the number is `42` then you subtract `24`. <br/>
now if you pass in the first number to the `compute2Digit` Method you get the second number.<br/>
example: if you subtract `24` from `42` you get 18 so if you pass in 1 you will get 8 or vice versa.

```ts
import { Magic } from "https://raw.githubusercontent.com/Eyoatam/math_magic/main/src/math.ts";
const math = new Magic();
// 42 - 24 = 18
// now pass in the first number(1)
const { computedValue } = math.compute2Digit(1);
// computed value will be 8
```

## Three digit trick

The second trick, first you take a three digit number, and then subtract the inverse of the number you got <br/>
example: if the number is `531`, you subtract `135` and you get `396`. Then if you pass in 3 to the `compute3Digit` Method <br/>
you get `9` and `6`.

```ts
import { Magic } from "https://raw.githubusercontent.com/Eyoatam/math_magic/main/src/math.ts";
const math = new Magic();
// 531 - 135 = 396
// now pass in the first number(3)
const { firstValue, secondValue } = math.compute3Digit(3);
// first value will be 9
// and second value will be 6
```

## Four digit trick

The rules are the same but now for a four digit number <br/>
so you pass in the first two numbers and you get the rest <br/>
example:

```ts
import { Magic } from "https://raw.githubusercontent.com/Eyoatam/math_magic/main/src/math.ts";
const math = new Magic();
// 6421 - 1246 = 5175
// now pass in the first two numbers (51)
const { firstValue, secondValue } = math.compute4Digit(51);
// firstValue will be 7
// and second value will be 5
```

## Five digit trick

And again the rules are the same. but now it's a five digit number <br/>
example:

```ts
import { Magic } from "https://raw.githubusercontent.com/Eyoatam/math_magic/main/src/math.ts";
const math = new Magic();
// 54321 - 12345 = 41976
// now pass in the first two numbers (41)
const { firstValue, secondValue, thirdValue } = math.compute4Digit(41);
// firstValue will be 9
// secondValue will be 7
// and thirdValue will be 6
```

## Six digit trick

Here the rules are the same but now it's a six digit number <br/>
so you pass in the first three numbers and you get the rest <br/>

example:

```ts
import { Magic } from "https://raw.githubusercontent.com/Eyoatam/math_magic/main/src/math.ts";
const math = new Magic();
// 765432 - 234567 = 530865
// now pass in the first three numbers (530)
const { firstValue, secondValue, thirdValue } = math.compute4Digit(530);
// firstValue will be 8
// secondValue will be 6
// and thirdValue will be 5
```

## License

[MIT](https://github.com/Eyoatam/math_magic/blob/main/LICENSE)
