var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);

function readLine(line) {
  if (line !== "\n") {
    var num = parseInt(line.toString(), 10);
    var result = calculate(num);

    console.log(result.operations);
    console.log(result.sequence.join(" "));

    process.exit();
  }
}

function calculate(amount) {
  let coins = [1, 3, 4];
  let minNumCoins = [];
  minNumCoins[0] = 0;
  for (currentValue = 1; currentValue <= amount; currentValue++) {
    minNumCoins[currentValue] = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < coins.length; j++) {
      let coin = coins[j];
      if (currentValue >= coin) {
        let numCoins = minNumCoins[currentValue - coin] + 1;
        if (numCoins < minNumCoins[currentValue]) {
          minNumCoins[currentValue] = numCoins;
        }
      }
    }
  }

  return minNumCoins[amount];
}

module.exports = { calculate };
