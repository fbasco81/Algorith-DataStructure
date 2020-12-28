var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);

let lineNumber = 0;

function readLine(line) {
  if (lineNumber === 0) {
    let result = processInput(line.toString());
    console.log(result);
    process.exit();
  }
  lineNumber++;
}

function processInput(input) {
  let len = input.length;
  let numInts = (len + 1) / 2;
  let numOperands = len - numInts;

  let ints = new Array(numInts);
  let j = 0;
  let operands = new Array(numOperands);
  let k = 0;

  for (let i = 0; i < len; i++) {
    if (i % 2 == 0) {
      ints[j] = parseInt(input[i]);
      j++;
    } else {
      operands[k] = input[i];
      k++;
    }
  }
  return maxVal(ints, operands);
}

function maxVal(ints, operands) {
  let n = ints.length;
  let M = new Array(n);
  let m = new Array(n);

  for (let i = 0; i < n; i++) {
    M[i] = new Array(n);
    m[i] = new Array(n);

    let temp = ints[i];

    M[i][i] = temp;
    m[i][i] = temp;
  }

  for (let s = 1; s < n; s++) {
    for (let i = 0; i < n - s; i++) {
      let j = i + s;
      let tempArr = minAndMax(M, m, operands, i, j);
      m[i][j] = tempArr[0];
      M[i][j] = tempArr[1];
    }
  }
  return M[0][n - 1];
}

function minAndMax(maximums, minimums, operands, i, j) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let a, b, c, d;
  for (let k = i; k <= j - 1; k++) {
    a = compute(maximums[i][k], maximums[k + 1][j], operands[k]);
    b = compute(maximums[i][k], minimums[k + 1][j], operands[k]);
    c = compute(minimums[i][k], maximums[k + 1][j], operands[k]);
    d = compute(minimums[i][k], minimums[k + 1][j], operands[k]);
    min = min5(min, a, b, c, d);
    max = max5(max, a, b, c, d);
  }

  let result = new Array(2);
  result[0] = min;
  result[1] = max;
  return result;
}

function max5(a, b, c, d, e) {
  return Math.max(Math.max(Math.max(Math.max(a, b), c), d), e);
}

function min5(a, b, c, d, e) {
  return Math.min(Math.min(Math.min(Math.min(a, b), c), d), e);
}

function compute(x, y, operand) {
  if (operand === "+") {
    return x + y;
  } else if (operand === "-") {
    return x - y;
  }
  return x * y;
}

module.exports = { processInput };

/* // generate expression method, for testing
	private static String generateExpression() {
		int length = (int)(Math.random() * 29 + 1); //max length is 29
		while (length < 3 || length % 2 == 0) {
			length = (int)(Math.random() * 29 + 1);
		}
		char[] chars = new char[length];
		char[] operands = {'+', '-', '*'};
		int i, j;
		for (i = 0; i < length; i++) {
			if (i % 2 == 0) {
				j = (int)(Math.random() * 10); //digits 0 through 9
				chars[i] = (char)(j + '0');
			}
			else {
				j = (int)(Math.random() * 3); //0, 1, or 2
				chars[i] = operands[j];
			}
		}
		String expression = new String(chars);
		return expression;
	} */

/* // print 2D array method, for testing
	private static void printArr(long[][] arr) {
		for (int i = 0; i < arr.length; i++) {
			for (int j = 0; j < arr[0].length; j++) {
				System.out.print(arr[i][j] + "\t");
			}
			System.out.println();
		}
	} */
