var readline = require("readline");
const util = require('util');

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);

function readLine(line) {
	if (line.toString().indexOf('test') >= 0){


		// deep test
// 		for (let i=1; i<100; i++){
// 			let numbers = getPairs(10**9);
// console.log(i, numbers);
			// let sum = 0;
			// for (let j=0;j<numbers.length; j++)
			// {
			// 	sum += numbers[j];
			// 	if (j > 0)
			// 	{
			// 		if (numbers[j] <= numbers[j-1])
			// 		{
			// 			console.log('error order', j);
			// 			break;
			// 		} 
			// 	}
			// }
	//		console.log(sum, numbers.length, numbers[numbers.length-1], numbers[numbers.length-2]);
			// if (sum != i)
			// {
			// 	console.log('error sum', i);
			// 			break;
			// }
//		}
//console.log(util.inspect(myArry, { maxArrayLength: null }));
		

		// test
		let test = getPairs(6);
		console.log(test.length === 3);
		console.log(arraysEqual(test,[1,2,3]));

		test = getPairs(8);
		console.log(test.length === 3);
		console.log(arraysEqual(test,[1,2,5]));


		process.exit();
	}
	if (line !== "\n") {
		var num = parseInt(line.toString(), 10);
		var numbers = getPairs(num);

		console.log(numbers.length);
		for (let i=0; i<numbers.length;i++)
			console.log(numbers[i] + ' ');
		
		process.exit();
	}
}

function getPairs(value) {
	// 3
	// 1 2

	// 8
	// 1 2 5

	// 12
	// 1
	// 2 1
	// 3 2 1
	// 9 2 1

	let remainingValue = value;
	let total = 0;
	let numbers = []
	while (remainingValue > 0)
	{
		let newValue = numbers.length === 0 ? 1 : numbers[numbers.length-1] + 1;
		let nextValue = (newValue * 2) + 1;
		let allValue = value - total;
		let choosenValue = 0;
		if (nextValue <= allValue){
			choosenValue = newValue;
		}
		else {
			choosenValue = allValue;
		}
		numbers.push(choosenValue);
		remainingValue -= choosenValue;
		total += choosenValue;
	}
	
	return numbers;
}


function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;
  
	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.
  
	for (var i = 0; i < a.length; ++i) {
	  if (a[i] !== b[i]) return false;
	}
	return true;
  }