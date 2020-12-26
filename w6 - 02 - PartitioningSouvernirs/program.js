var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);

let lineNumber = 0;
let souvenirs = [];
let totalSouvenirs = 0;

function readLine(line) {
  if (lineNumber === 0) {
    totalSouvenirs = parseInt(line.toString(), 10);
  }
  if (lineNumber === 1) {
    souvenirs = line
      .toString()
      .split(" ")
      .map((a) => parseInt(a));

    let result = partition(souvenirs);
    console.log(result);
    process.exit();
  }
  lineNumber++;
}

function partition(souvenirs) {
  if (souvenirs.length < 3) return 0;

  let totalSouvenirs = souvenirs.reduce((prev, curr) => prev + curr);

  if (totalSouvenirs % 3 != 0) return 0;

  totalSouvenirs = totalSouvenirs / 3;
  let matrix = new Array(totalSouvenirs + 1);
  let count = 0;

  for (let i = 0; i <= totalSouvenirs; i++) {
    matrix[i] = new Array(souvenirs.length + 1);
    matrix[i][0] = 0;
  }

  for (let j = 0; j <= souvenirs.length; j++) {
    matrix[0][j] = 0;
  }

  for (let i = 1; i <= totalSouvenirs; i++) {
    for (let j = 1; j <= souvenirs.length; j++) {
      matrix[i][j] = matrix[i][j - 1];
      if (souvenirs[j - 1] <= i) {
        let temp = matrix[i - souvenirs[j - 1]][j - 1] + souvenirs[j - 1];
        if (temp > matrix[i][j]) {
          matrix[i][j] = temp;
        }
      }
      if (matrix[i][j] == totalSouvenirs) {
        count += 1;
      }
    }
  }

  if (count < 3) {
    return 0;
  }
  return 1;
}

module.exports = { partition };
