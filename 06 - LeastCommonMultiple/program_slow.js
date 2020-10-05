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
			console.log(lcm(8, 8) === 8, "8,8");
			console.log(
				lcm(2000000000, 1999999999) === 3999999998000000000,
				"2000000000 , 1999999999"
			);
		}

		var num1 = parseInt(line.toString().split(" ")[0], 10);
		var num2 = parseInt(line.toString().split(" ")[1], 10);

		var lcmResult = lcm(num1, num2);

		// test
		console.log(lcmResult);
		process.exit();
	}
}

function lcm(n1, n2) {
	if (n1 <= 0 || n2 <= 0) return NaN;

	// list of prime numbers
	let primeNumbers = [...take(10000, primes(n1 > n2 ? n1 : n2))];
	// factorialize
	let primeFactorsN1 = primeFactor(n1, primeNumbers);
	let primeFactorsN2 = primeFactor(n2, primeNumbers);
	console.log(primeFactorsN1);
	console.log(primeFactorsN2);

	let result = 1;
	for (let key in primeFactorsN1) {
		let exponent = 1;
		// get higher exponent
		if (
			!primeFactorsN2[key] ||
			primeFactorsN1[key] >= primeFactorsN2[key]
		) {
			exponent = primeFactorsN1[key];
			result *= parseInt(Math.pow(key, exponent));
			//console.log(`key ${key} expo: ${exponent}`);
		}
	}

	for (let key in primeFactorsN2) {
		let exponent = 1;
		// get higher exponent

		if (!primeFactorsN1[key] || primeFactorsN2[key] > primeFactorsN1[key]) {
			exponent = primeFactorsN2[key];
			result *= parseInt(Math.pow(key, exponent));
			//console.log(`key ${key} expo: ${exponent}`);
		}
	}

	return result;
}

function primeFactor(n, primeNumbers) {
	let factorial = {};
	let i = 0;
	let nDivided = n;

	while (i < primeNumbers.length && n > primeNumbers[i]) {
		if (nDivided % primeNumbers[i] === 0) {
			nDivided /= primeNumbers[i];
			//console.log(nDivided, factorial[primeNumbers[i]], primeNumbers[i]);
			if (factorial[primeNumbers[i]]) factorial[primeNumbers[i]]++;
			else factorial[primeNumbers[i]] = 1;
		} else i++;
	}
	return factorial;
}

function* primes() {
	let n = 2;

	while (true) {
		if (isPrime(n)) yield n;
		n++;
	}

	function isPrime(num) {
		for (var i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) {
				return false;
			}
		}
		return true;
	}
}
function* take(length, iterable) {
	for (let x of iterable) {
		if (length <= 0) return;
		length--;
		yield x;
	}
}
//
