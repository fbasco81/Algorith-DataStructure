var readline = require("readline");
const BigNumber = require('bignumber.js');

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
	var total = new BigNumber(0);
	for (var i=n; i>=0; i--)
	{
		total.plus(fibonacci(i).decimalPlaces(0));
		console.log('fibonacci=', fibonacci(i).decimalPlaces(0).toFixed(),'total=', total);
//		console.log('----------------------------');
		
	}
//	console.log(total.toString());
	return total.toString().substr(total.toString().length-1,1);
}


function fibonacci(n) {
	let o = new BigNumber(1 + Math.sqrt(5)).dividedBy(2); // should be 1.618034
	let nth = new BigNumber(n); //BigInt(n);

	let numerator1 = o.exponentiatedBy(nth);
	let numerator2 = new BigNumber((new BigNumber(1) - o)).exponentiatedBy(nth);
	let divider = new BigNumber(Math.sqrt(5)); // * (BigInt(1) ** nth); 
	
	let result = new BigNumber(numerator1 - numerator2).dividedBy(divider);
	//console.log('num1=' + numerator1,'num2='+ numerator2);
	//console.log('divider=' +divider);
	//return result;
	return result;
}

function fibonacci2(n) {
	let scale = 10*10000000000000000000000; //Number.MAX_SAFE_INTEGER;
	let o = BigInt(1.6180339887 * scale); // should be 1.618034
	let nth = BigInt(n);

	let numerator1 = o ** nth;
	let numerator2 = (BigInt(1*scale) - o) ** nth;
	let divider = BigInt(Math.sqrt(5) * scale); // * (BigInt(1) ** nth); 
	if (n >= 2)
	{
		divider = divider * (BigInt(scale) ** BigInt(n-1));
	}
	//* (BigInt(1000000)**BigInt(n === 0 ? 1 : n));
	let result = (numerator1 - numerator2) / (divider);
	//console.log('num1=' + numerator1,'num2='+ numerator2);
	//console.log('divider=' +divider);
	//return result;
	return result;
}
