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
    string1 = line.toString();
  }
  if (lineNumber === 1) {
    string2 = line.toString();

    console.log(distance(string1, string2));
    process.exit();
  }
  lineNumber++;
}

function distance(string1, string2) {
  string1 = " " + string1;
  string2 = " " + string2;

  let matrix = new Array(string1.length);
  let min = 0;

  for (i = 0; i < string1.length; i++) {
    matrix[i] = new Array(string2.length);
    for (j = 0; j < string2.length; j++) {
      if (i === 0) {
        min = j;
      } else if (j === 0) {
        min = i;
      } else {
        min = Math.min(
          matrix[i - 1][j - 1],
          matrix[i][j - 1],
          matrix[i - 1][j]
        );
      }

      if (string1[i] !== string2[j] && i !== 0 && j !== 0) {
        min += 1;
      }
      matrix[i][j] = min;
    }
  }

  return matrix[string1.length - 1][string2.length - 1];
}

module.exports = { distance };
