class DenoStdInternalError extends Error {
  constructor(message) {
    super(message);
    this.name = "DenoStdInternalError";
  }
}
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}
function get(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
}
function getForce(obj, key) {
  const v = get(obj, key);
  assert(v != null);
  return v;
}
function isNumber(x) {
  if (typeof x === "number") return true;
  if (/^0x[0-9a-f]+$/i.test(String(x))) return true;
  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
}
function hasKey(obj, keys) {
  let o = obj;
  keys.slice(0, -1).forEach((key) => {
    o = get(o, key) ?? {};
  });
  const key = keys[keys.length - 1];
  return key in o;
}
function parse(
  args,
  {
    "--": doubleDash = false,
    alias = {},
    boolean: __boolean = false,
    default: defaults = {},
    stopEarly = false,
    string = [],
    unknown = (i) => i,
  } = {},
) {
  const flags = {
    bools: {},
    strings: {},
    unknownFn: unknown,
    allBools: false,
  };
  if (__boolean !== undefined) {
    if (typeof __boolean === "boolean") {
      flags.allBools = !!__boolean;
    } else {
      const booleanArgs = typeof __boolean === "string"
        ? [
          __boolean,
        ]
        : __boolean;
      for (const key of booleanArgs.filter(Boolean)) {
        flags.bools[key] = true;
      }
    }
  }
  const aliases = {};
  if (alias !== undefined) {
    for (const key in alias) {
      const val = getForce(alias, key);
      if (typeof val === "string") {
        aliases[key] = [
          val,
        ];
      } else {
        aliases[key] = val;
      }
      for (const alias1 of getForce(aliases, key)) {
        aliases[alias1] = [
          key,
        ].concat(aliases[key].filter((y) => alias1 !== y));
      }
    }
  }
  if (string !== undefined) {
    const stringArgs = typeof string === "string"
      ? [
        string,
      ]
      : string;
    for (const key of stringArgs.filter(Boolean)) {
      flags.strings[key] = true;
      const alias1 = get(aliases, key);
      if (alias1) {
        for (const al of alias1) {
          flags.strings[al] = true;
        }
      }
    }
  }
  const argv = {
    _: [],
  };
  function argDefined(key, arg) {
    return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) ||
      !!get(flags.strings, key) || !!get(aliases, key);
  }
  function setKey(obj, keys, value) {
    let o = obj;
    keys.slice(0, -1).forEach(function (key) {
      if (get(o, key) === undefined) {
        o[key] = {};
      }
      o = get(o, key);
    });
    const key = keys[keys.length - 1];
    if (
      get(o, key) === undefined || get(flags.bools, key) ||
      typeof get(o, key) === "boolean"
    ) {
      o[key] = value;
    } else if (Array.isArray(get(o, key))) {
      o[key].push(value);
    } else {
      o[key] = [
        get(o, key),
        value,
      ];
    }
  }
  function setArg(key, val, arg = undefined) {
    if (arg && flags.unknownFn && !argDefined(key, arg)) {
      if (flags.unknownFn(arg, key, val) === false) return;
    }
    const value = !get(flags.strings, key) && isNumber(val) ? Number(val) : val;
    setKey(argv, key.split("."), value);
    const alias1 = get(aliases, key);
    if (alias1) {
      for (const x of alias1) {
        setKey(argv, x.split("."), value);
      }
    }
  }
  function aliasIsBoolean(key) {
    return getForce(aliases, key).some((x) =>
      typeof get(flags.bools, x) === "boolean"
    );
  }
  for (const key of Object.keys(flags.bools)) {
    setArg(key, defaults[key] === undefined ? false : defaults[key]);
  }
  let notFlags = [];
  if (args.includes("--")) {
    notFlags = args.slice(args.indexOf("--") + 1);
    args = args.slice(0, args.indexOf("--"));
  }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (/^--.+=/.test(arg)) {
      const m = arg.match(/^--([^=]+)=(.*)$/s);
      assert(m != null);
      const [, key1, value] = m;
      if (flags.bools[key1]) {
        const booleanValue = value !== "false";
        setArg(key1, booleanValue, arg);
      } else {
        setArg(key1, value, arg);
      }
    } else if (/^--no-.+/.test(arg)) {
      const m = arg.match(/^--no-(.+)/);
      assert(m != null);
      setArg(m[1], false, arg);
    } else if (/^--.+/.test(arg)) {
      const m = arg.match(/^--(.+)/);
      assert(m != null);
      const [, key1] = m;
      const next = args[i + 1];
      if (
        next !== undefined && !/^-/.test(next) && !get(flags.bools, key1) &&
        !flags.allBools && (get(aliases, key1) ? !aliasIsBoolean(key1) : true)
      ) {
        setArg(key1, next, arg);
        i++;
      } else if (/^(true|false)$/.test(next)) {
        setArg(key1, next === "true", arg);
        i++;
      } else {
        setArg(key1, get(flags.strings, key1) ? "" : true, arg);
      }
    } else if (/^-[^-]+/.test(arg)) {
      const letters = arg.slice(1, -1).split("");
      let broken = false;
      for (let j = 0; j < letters.length; j++) {
        const next = arg.slice(j + 2);
        if (next === "-") {
          setArg(letters[j], next, arg);
          continue;
        }
        if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
          setArg(letters[j], next.split(/=(.+)/)[1], arg);
          broken = true;
          break;
        }
        if (
          /[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)
        ) {
          setArg(letters[j], next, arg);
          broken = true;
          break;
        }
        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
          setArg(letters[j], arg.slice(j + 2), arg);
          broken = true;
          break;
        } else {
          setArg(letters[j], get(flags.strings, letters[j]) ? "" : true, arg);
        }
      }
      const [key1] = arg.slice(-1);
      if (!broken && key1 !== "-") {
        if (
          args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) &&
          !get(flags.bools, key1) && (get(aliases, key1)
            ? !aliasIsBoolean(key1)
            : true)
        ) {
          setArg(key1, args[i + 1], arg);
          i++;
        } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
          setArg(key1, args[i + 1] === "true", arg);
          i++;
        } else {
          setArg(key1, get(flags.strings, key1) ? "" : true, arg);
        }
      }
    } else {
      if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
        argv._.push(flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg));
      }
      if (stopEarly) {
        argv._.push(...args.slice(i + 1));
        break;
      }
    }
  }
  for (const key1 of Object.keys(defaults)) {
    if (!hasKey(argv, key1.split("."))) {
      setKey(argv, key1.split("."), defaults[key1]);
      if (aliases[key1]) {
        for (const x of aliases[key1]) {
          setKey(argv, x.split("."), defaults[key1]);
        }
      }
    }
  }
  if (doubleDash) {
    argv["--"] = [];
    for (const key2 of notFlags) {
      argv["--"].push(key2);
    }
  } else {
    for (const key2 of notFlags) {
      argv._.push(key2);
    }
  }
  return argv;
}
const noColor = globalThis.Deno?.noColor ?? true;
let enabled = !noColor;
function code(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run(str, code1) {
  return enabled
    ? `${code1.open}${str.replace(code1.regexp, code1.open)}${code1.close}`
    : str;
}
function green(str) {
  return run(
    str,
    code([
      32,
    ], 39),
  );
}
function brightGreen(str) {
  return run(
    str,
    code([
      92,
    ], 39),
  );
}
const ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|"),
  "g",
);
class Magic {
  compute2Digit(num) {
    const computedValue = 9 - num;
    return {
      computedValue,
      num,
    };
  }
  compute3Digit(num) {
    const firstValue = 9;
    const secondValue = 9 - num;
    return {
      firstValue: 9,
      secondValue,
      num,
    };
  }
  compute4Digit(num) {
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
  compute5Digit(num) {
    const splitNum = num.toString().split("");
    const [num1, num2] = splitNum;
    const firstValue = 9;
    const secondValue = 8 - +num2;
    const thirdValue = 10 - +num1;
    return {
      firstValue: 9,
      secondValue,
      thirdValue,
      num,
    };
  }
  compute6Digit(num) {
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
  compute7Digit(num) {
    const splitNum = num.toString().split("");
    const [num1, num2, num3] = splitNum;
    const firstValue = 9;
    const secondValue = 8 - +num3;
    const thirdValue = 9 - +num2;
    const fourthValue = 10 - +num1;
    return {
      firstValue: 9,
      secondValue,
      thirdValue,
      fourthValue,
      num,
    };
  }
  compute8Digit(num) {
    const splitNum = num.toString().split("");
    const [num1, num2, num3, num4] = splitNum;
    const firstValue = 8 - +num4;
    const secondValue = 9 - +num3;
    const thirdValue = 9 - +num2;
    const fourthValue = 10 - +num1;
    return {
      firstValue,
      secondValue,
      thirdValue,
      fourthValue,
      num,
    };
  }
  compute9Digit(num) {
    const splitNum = num.toString().split("");
    const [num1, num2, num3, num4] = splitNum;
    const firstValue = 9;
    const secondValue = 8 - +num4;
    const thirdValue = 9 - +num3;
    const fourthValue = 9 - +num2;
    const fifthValue = 10 - +num1;
    return {
      firstValue: 9,
      secondValue,
      thirdValue,
      fourthValue,
      fifthValue,
      num,
    };
  }
}
const parsedArgs = parse(Deno.args);
if (parsedArgs.help || parsedArgs.h || parsedArgs.length === 0) {
  console.log(
    `\n  Usage: cli.ts --option [number]\n\n  options: --two [number] - compute two digit number\n           --three [number] - compute three digit number\n           --four [number] -  compute four digit number\n           --five [number] - compute five digit number\n  `,
  );
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
        num + firstValue.toString() + secondValue.toString() +
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
          num + firstValue.toString() + secondValue.toString() +
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
        num + firstValue.toString() + secondValue.toString() +
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
          num + firstValue.toString() + secondValue.toString() +
            thirdValue.toString(),
        ),
    );
  }
}
if (typeof parsedArgs.seven === "number") {
  const { firstValue, secondValue, thirdValue, fourthValue, num } = math
    .compute7Digit(+parsedArgs.seven);
  console.log(
    "Your number is " +
      green(
        num + firstValue.toString() + secondValue.toString() +
          thirdValue.toString() + fourthValue.toString(),
      ),
  );
} else if (parsedArgs.seven && typeof parsedArgs.seven !== "number") {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number) {
    const { firstValue, secondValue, thirdValue, fourthValue, num } = math
      .compute7Digit(+number);
    console.log(
      "Your number is " +
        green(
          num + firstValue.toString() + secondValue.toString() +
            thirdValue.toString() + fourthValue.toString(),
        ),
    );
  }
}
if (typeof parsedArgs.eight === "number") {
  const { firstValue, secondValue, thirdValue, fourthValue, num } = math
    .compute8Digit(+parsedArgs.eight);
  console.log(
    "Your number is " +
      green(
        num + firstValue.toString() + secondValue.toString() +
          thirdValue.toString() + fourthValue.toString(),
      ),
  );
} else if (parsedArgs.eight && typeof parsedArgs.eight !== "number") {
  const number = prompt(brightGreen("? ") + " The first three numbers:");
  if (number) {
    const { firstValue, secondValue, thirdValue, fourthValue, num } = math
      .compute8Digit(+number);
    console.log(
      "Your number is " +
        green(
          num + firstValue.toString() + secondValue.toString() +
            thirdValue.toString() + fourthValue.toString(),
        ),
    );
  }
}
if (typeof parsedArgs.nine === "number") {
  const { firstValue, secondValue, thirdValue, fourthValue, fifthValue, num } =
    math.compute9Digit(+parsedArgs.nine);
  console.log(
    "Your number is " +
      green(
        num + firstValue.toString() + secondValue.toString() +
          thirdValue.toString() + fourthValue.toString() +
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
          num + firstValue.toString() + secondValue.toString() +
            thirdValue.toString() + fourthValue.toString() +
            fifthValue.toString(),
        ),
    );
  }
}
