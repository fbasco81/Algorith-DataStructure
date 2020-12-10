var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);

function readLine(line) {
	if (line.toString().indexOf("test") >= 0) {
		let doTest = (input, expected) => {
		  let actual = changeCoins(input);
		  if (actual !== expected) {
			console.log(
			  "Test failed: found " + actual + " expected:" + expected
			);
			return false;
		  }
	
		  console.log("Test OK");
		  return true;
		};
	
		doTest(2, 2);
		doTest(34, 9);
	
		process.exit();
	  }

	if (line !== "\n") {
		var num = parseInt(line.toString(), 10);
		var numberOfCoins = changeCoins(num);

		console.log(numberOfCoins);
		process.exit();
	}
}

function changeCoins(amount) {
	let coins = [1,3,4];
	let minNumCoins = new Array(amount);
	minNumCoins[0] = 0;
	for (currentValue=1; currentValue<=amount;currentValue++){
		minNumCoins[currentValue] = Number.MAX_SAFE_INTEGER;
		for (let j=0;j<coins.length;j++){
			let coin = coins[j];
			if (currentValue >= coin){
				let numCoins = minNumCoins[currentValue-coin]+1;
				if (numCoins < minNumCoins[currentValue]){
					minNumCoins[currentValue] = numCoins;
				}
			}
		}
	}
	
	return minNumCoins[amount];
}
