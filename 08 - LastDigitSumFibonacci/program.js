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
		var result = lastDigitSumOfFibonacci(num);

		// test
		//console.log(fibonacci(4) === 3);
		//console.log(fibonacci(239));

		console.log(result);
		process.exit();
	}
}

function lastDigitSumOfFibonacci(n)
{
	var total = BigInt(0);
	for (var i=n; i>=0; i--)
	{
		total += fibonacci(i);
		//console.log('fibonacci=', fibonacci(i),'total=', total);
//		console.log('----------------------------');
		
	}
//	console.log(total.toString());
	return total.toString().substr(total.toString().length-1,1);
}
var cache = {};
   

function fibonacci(n) {
	if (cache[n])
		return cache[n];
	let a = BigInt(0);
	let b = BigInt(1);
	
	for (var i = 31; i >= 0; i--) {
		let d = BigInt(a * (b * BigInt(2) - a));
		let	e = BigInt(a * a + b * b);
		a = d;
		b = e;
		if (((n >> i) & 1) != 0) {
			let c = a + b;
			a = b;
			b = c;
		}
	}
	cache[n] = a;
		return a;
}


