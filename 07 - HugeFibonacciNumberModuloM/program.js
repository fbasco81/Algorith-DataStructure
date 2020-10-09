var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);

function readLine(line) {
	if (line !== "\n") {
		// run test
		if (line.toString().length === 0) {
			// console.log(fibonacciModulo(239, 1000) === 161, "239, 1000");
			// console.log(
			// 	fibonacciModulo(2816213588, 239) === 151,
			// 	"2816213588 , 239"
			// );
			console.log(
				fibonacciModulo(99999999999999999, 2) === 0,
				"99999999999999999, 2"
			);

			process.exit();
		}

		var n = parseInt(line.toString().split(" ")[0], 10);
		var m = parseInt(line.toString().split(" ")[1], 10);
		var fibonacciResult = fibonacciModulo(n, m);

		// test
		//console.log(fibonacci(4) === 3);
		//console.log(fibonacci(10) === 55);

		console.log(fibonacciResult);
		process.exit();
	}
}

function fibonacciModulo(n, m) {
	let list = [0, 1];
	let periodLength = 0;
	if (n < 0) return NaN;
	if (n <= 1) return n;
	for (let i = 2; i <= n; i++) {
		//console.log((list[i - 1] + list[i - 2]) % m);
		list.push((list[i - 1] + list[i - 2]) % m);
		if (i > 2 && list[i - 1] === 0 && list[i] === 1) {
			periodLength = list.length - 2;
			break;
		}
	}
	console.log(list);
	if (periodLength == 0) {
		return list[list.length - 1];
	} else {
		console.log(periodLength);
		let reminder = n % periodLength;
		console.log("reminder", reminder);
		return list[reminder];
	}
}
