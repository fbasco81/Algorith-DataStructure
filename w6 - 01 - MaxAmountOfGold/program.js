var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);

let lineNumber = 0;
let capacity = 0;
let barWeights = [];
let numberOfBars = 0;

function readLine(line) {
  if (lineNumber === 0) {
    capacity = parseInt(line.toString().split(" ")[0], 10);
    numberOfBars = parseInt(line.toString().split(" ")[1], 10);
  }
  if (lineNumber === 1) {
    barWeights = line.toString().split(" ");

    let result = gold(capacity, barWeights);
    console.log(result);
    process.exit();
  }
  lineNumber++;
}

function gold(capacity, barWeights) {
  let weights = [capacity + 1];
  weights[0] = 0;
  for (var w = 1; w <= capacity; w++) {
    weights[i] = weights[i - 1];
    for (var i = 0; i < barWeights; i++) {
      if (weights[w] + barWeights[i] <= capacity) {
        let val = Math.max(weights[w] + barWeights[i], weights[w]);
      }
    }
  }

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

module.exports = { gold };
