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
			console.log(lcm(8, 8) === 8n, "8,8");
			console.log(
				lcm(2000000000, 1999999999) === 3999999998000000000n,
				"2000000000 , 1999999999"
			);
			console.log(
				lcm(1827116622, 251772294) === 76669557221078478n,
				"1827116622 , 251772294"
			);
			process.exit();
		}

		var num1 = parseInt(line.toString().split(" ")[0], 10);
		var num2 = parseInt(line.toString().split(" ")[1], 10);

		var lcmResult = lcm(num1, num2);

		// test
		console.log(lcmResult.toString());
		process.exit();
	}
}

function lcm(n1, n2) {
	if (n1 <= 0 || n2 <= 0) return NaN;

	let gcdRes = gcd(n1, n2);
	let factor1 = BigInt(Math.min(n1, n2) / gcdRes);
	let factor2 = BigInt(Math.max(n1, n2));
	// the trick!
	let result = factor1 * factor2;

	return result;
}

function gcd(n1, n2) {
	if (n1 <= 0 || n2 <= 0) return NaN;

	// list of prime numbers
	let primeNumbers = [...take(10000, primes(n1 > n2 ? n1 : n2))];
	// factorialize
	let primeFactorsN1 = primeFactor(n1, primeNumbers);
	let primeFactorsN2 = primeFactor(n2, primeNumbers);
	//console.log(primeFactorsN1);
	//console.log(primeFactorsN2);

	let result = 1;
	for (let key in primeFactorsN1) {
		// exist in both collection ?
		if (primeFactorsN2[key]) {
			// get lower exponent
			let exponent =
				primeFactorsN1[key] <= primeFactorsN2[key]
					? primeFactorsN1[key]
					: primeFactorsN2[key];
			//console.log(`key ${key} expo: ${exponent}`);
			result *= parseInt(Math.pow(key, exponent));
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
