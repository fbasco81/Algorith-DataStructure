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
    barWeights = line
      .toString()
      .split(" ")
      .map((a) => parseInt(a));

    let result = gold(capacity, barWeights);
    console.log(result);
    process.exit();
  }
  lineNumber++;
}

function gold(capacity, barWeights) {
  let matrix = new Array(barWeights.length + 1);

  for (let i = 0; i <= barWeights.length; i++) {
    matrix[i] = new Array(capacity + 1);
    matrix[i][0] = 0;
  }

  for (let w = 0; w <= capacity; w++) {
    matrix[0][w] = 0;
  }

  for (let i = 1; i <= barWeights.length; i++) {
    for (let w = 1; w <= capacity; w++) {
      matrix[i][w] = matrix[i - 1][w];
      if (barWeights[i - 1] <= w) {
        let val = matrix[i - 1][w - barWeights[i - 1]] + barWeights[i - 1];
        if (matrix[i][w] < val) {
          matrix[i][w] = val;
        }
      }
    }
  }
  return matrix[barWeights.length][capacity];
}

module.exports = { gold };
