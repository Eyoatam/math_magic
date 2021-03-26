export class Magic {
  compute2Digit(num: number): { computedValue: number; num: number } {
    const computedValue = 9 - num;
    return {
      computedValue,
      num,
    };
  }

  compute3Digit(
    num: number
  ): { firstValue: number; secondValue: number; num: number } {
    const firstValue = 9;
    const secondValue = firstValue - num;
    return {
      firstValue,
      secondValue,
      num,
    };
  }

  compute4Digit(
    num: number
  ): { firstValue: number; secondValue: number; num: number } {
    const splitNum = num.toString().split("");
    const [num1, num2] = splitNum;
    const firstValue = 8 - +num2;
    const secondValue = 10 - +num1;
    return {
      firstValue,
      secondValue,
      num,
    };
  }

  compute5Digit(
    num: number
  ): {
    firstValue: number;
    secondValue: number;
    thirdValue: number;
    num: number;
  } {
    const splitNum = num.toString().split("");
    const [num1, num2] = splitNum;
    const firstValue = 9;
    const secondValue = 8 - +num2;
    const thirdValue = 10 - +num1;
    return {
      firstValue,
      secondValue,
      thirdValue,
      num,
    };
  }

  compute6Digit(
    num: number
  ): {
    firstValue: number;
    secondValue: number;
    thirdValue: number;
    num: number;
  } {
    const splitNum = num.toString().split("");
    const [num1, num2, num3] = splitNum;
    const firstValue = 8 - +num3;
    const secondValue = 9 - +num2;
    const thirdValue = 10 - +num1;
    return {
      firstValue,
      secondValue,
      thirdValue,
      num,
    };
  }
}
