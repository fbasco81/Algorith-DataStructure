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
		var fibonacciResult = fibonacci(num);

		// test
		//console.log(fibonacci(4) === 3);
		//console.log(fibonacci(10) === 55);

		console.log(fibonacciResult);
		process.exit();
	}
}

function fibonacci(n) {
	let list = [0, 1];

	if (n < 0) return NaN;
	if (n <= 1) return n;
	for (let i = 2; i <= n; i++) {
		list.push(list[i - 1] + list[i - 2]);
	}
	//console.log(list);
	return list[list.length - 1];
}
