export class Magic {
  compute2Digit(num: number): { computedValue: number } {
    const computedValue = 9 - num;
    return {
      computedValue,
    };
  }

  compute3Digit(num: number): { firstValue: number; secondValue: number } {
    const firstValue = 9;
    const secondValue = firstValue - num;
    return {
      firstValue,
      secondValue,
    };
  }

  compute4Digit(num: number): { firstValue: number; secondValue: number } {
    const splitNum = num.toString().split("");
    const firstValue = 8 - +splitNum[1];
    const secondValue = 10 - +splitNum[0];
    return {
      firstValue,
      secondValue,
    };
  }

  compute5Digit(
    num: number,
  ): { firstValue: number; secondValue: number; thirdValue: number } {
    const splitNum = num.toString().split("");
    const firstValue = 9;
    const secondValue = 8 - +splitNum[1];
    const thirdValue = 10 - +splitNum[0];
    return {
      firstValue,
      secondValue,
      thirdValue,
    };
  }

  compute6Digit(num: number) {
    const splitNum = num.toString().split("");
    const firstValue = 8 - +splitNum[2];
    const secondValue = 9 - +splitNum[1];
    const thirdValue = 10 - +splitNum[0];
    return {
      firstValue,
      secondValue,
      thirdValue,
    };
  }
}
