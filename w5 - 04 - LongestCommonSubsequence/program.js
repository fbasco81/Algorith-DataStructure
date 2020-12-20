var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);

let lineNumber = 0;
let array1 = [];
let numElementsArray1 = 0;
let array2 = [];
let numElementsArray2 = 0;

function readLine(line) {
  if (lineNumber === 0) {
    numElementsArray1 = parseInt(line.toString(), 10);
  }
  if (lineNumber === 1) {
    array1 = line.toString().split(" ");
  }
  if (lineNumber === 2) {
    numElementsArray2 = parseInt(line.toString(), 10);
  }
  if (lineNumber === 3) {
    array2 = line.toString().split(" ");

    let result = getCommonSubsequence(array1, array2);
    console.log(result);
    process.exit();
  }
  lineNumber++;
}

function getCommonSubsequence(array1, array2) {
  // let result = [];
  // for (i = 0; i < array1.length; i++) {
  //   for (j = 0; j < array2.length; j++) {
  //     if (array1[i] === array2[j]) {
  //       if (result.length === 0 || result[result.length - 1] < array1[i])
  //         result.push(array1[i]);
  //     }
  //   }
  // }

  let matrix = new Array(array1.length + 1);

  for (i = 0; i <= array1.length; i++) {
    matrix[i] = new Array(array2.length + 1);
    matrix[i][0] = 0;
  }

  for (j = 0; j <= array2.length; j++) {
    matrix[0][j] = 0;
  }

  for (i = 1; i <= array1.length; i++) {
    for (j = 1; j <= array2.length; j++) {
      if (array1[i - 1] === array2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i][j - 1], matrix[i - 1][j]);
      }
    }
  }

  return matrix[array1.length][array2.length];
}

module.exports = { getCommonSubsequence };
