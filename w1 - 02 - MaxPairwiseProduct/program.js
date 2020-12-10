var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let n = 0;
let a = [];
function readLine(line) {
	if (lineNumber === 0) {
		n = parseInt(line.toString());
		lineNumber++;
		return;
	}

	if (lineNumber === 1) {
		a = line.toString().split(" ");
		var num1 = 0;
		var num2 = 0;

		for (var i = 0; i < a.length; i++) {
			var currentNumber = parseInt(a[i], 10);
			if (currentNumber > num1) {
				if (num1 > num2) num2 = num1;
				num1 = currentNumber;
			} else if (currentNumber > num2) {
				num2 = currentNumber;
			}
		}

		// console.log(a);
		// console.log(num1, num2);

		console.log(num1 * num2);
		process.exit();
	}
}
