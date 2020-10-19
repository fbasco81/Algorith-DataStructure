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
		var numberOfCoins = changeCoins(num);

		
		// test
		// console.log(changeCoins(9999) === 1004);
		// console.log(changeCoins(10000) === 1000);
		// console.log(changeCoins(12) === 3);
		// console.log(changeCoins(1) === 1);
		
		// for (var i=1; i<10**3;i++){
		// 	console.log(changeCoins(i));
		// }

		//console.log(fibonacci(10) === 55);

		console.log(numberOfCoins);
		process.exit();
	}
}

function changeCoins(value) {
	let denominations = [1,5, 10];
	let coins = 0;

	while (value > 0){
	//	console.info("-------------");
		const den = denominations.pop();
	//	console.info("den:", den);

		if (value >= den)
		{
			
	//		console.info("value:", value);
			coins += Math.trunc(value / den);
	//		console.info("coins:", coins);
			value = value % den;
	//		console.info("remaining value:", value);
			
		}
	//	console.info("-------------");

	}
	
	return coins;
}
