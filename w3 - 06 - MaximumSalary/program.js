var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let n = 0;
let numbers = [];

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		// test

		// random test

		// while (true)
		// {

		// 	let totalNumbers = Math.round(Math.random() * 100);
		// 	let numbers = []

		// 	for (let i=0; i<totalNumbers; i++){
		// 		numbers.push(Math.round(Math.random() * 1000));
		// 	}

		// 	if (maxSalary([...numbers]) !== maxSalary2([...numbers]))
		// 	{
		// 		console.log(numbers);
		// 		process.exit()
		// 	}
		// }
		
		console.log(maxSalary([561, 5, 51, 511, 485, 462]) === '561551511485462');
		
		console.log(maxSalary([2,111,11,1,1,10,0]) === '21111111100');

		console.log(maxSalary([2311111, 392, 923232,1, 11, 111, 123, 222222, 2, 21]) === '9232323922311111222222221123111111');

		console.log(maxSalary([21, 2]) === '221');
		
		console.log(maxSalary([9, 4, 6, 1, 9]) === '99641');

		console.log(maxSalary([23, 39, 92]) === '923923');

		console.log(maxSalary([10, 2]) === '210');

		console.log(maxSalary([10000, 101, 2, 20001, 1]) === '220001110110000');


		process.exit();
	}

	if (lineNumber === 0) {
		n = parseInt(line.toString(), 10);
	}

	if (lineNumber >= 1) {
		numbers = line.toString().split(" ");

		let result = maxSalary(numbers); 
		console.log(result);
		
		process.exit();
	
	}
	lineNumber++;
	
}

function maxSalary(numbers)
{
	let orderedNumbers = [];
	let indexOfRemove = -1;
	while (numbers.length > 0) { 
		let maxDigit = 0;
		numbers.forEach((digit, i) => {
			if (isGreaterOrEqual(digit, maxDigit))
			{
				maxDigit = digit;
				indexOfRemove = i;
			}
		});
		orderedNumbers.push(maxDigit);
		numbers.splice(indexOfRemove, 1);
	}

	let result = '';
	for (let i=0; i<orderedNumbers.length;i++)
		result += orderedNumbers[i];
	return result;
}

function isGreaterOrEqual(digit, maxDigit){
	return parseInt(digit.toString()+maxDigit.toString()) >= parseInt(maxDigit.toString()+digit.toString());
}





