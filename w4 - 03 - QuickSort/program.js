var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let numbers = [];
let n = 0;

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		
		let doTest = (actual, expected) => {
			let res = quickSort(actual, 0, actual.length-1);
			if (res.join(' ') !== expected.join(' '))
			{
				console.log('Test failed: found' + res + ' expected:' + expected);
				return;
				
			}
			console.log('Test OK');
		};

		let ns = [2, 3, 9, 2, 2];
		doTest(ns, [2,2, 2, 3, 9]);

		process.exit();
	}

	if (lineNumber === 0) {
		n = parseInt(line.toString(),10);
	}

	if (lineNumber === 1) {
		numbers = line.toString().split(" ").map(x => parseInt(x,10));;
		
		let result = quickSort(numbers, 0, numbers.length-1); 
		console.log(result.join(' '));

		process.exit();
	
	}
	lineNumber++;
	
}

function partition2(array, l, r) {
	let x = array[l];
	let j = l;
	for (let i = l + 1; i <= r; i++) {
		if (array[i] <= x) {
			j++;
			let t = array[i];
			array[i] = array[j];
			array[j] = t;
		}
	}
	let t = array[l];
	array[l] = array[j];
	array[j] = t;
	return j;
}

function quickSort(array, l, r) {
	if (l >= r) {
		return;
	}
	let k = (Math.random() * (r - l + 1)) + l;
	let t = array[l];
	array[l] = array[k];
	array[k] = t;
	//use partition3
	let m = partition2(array, l, r);
	quickSort(array, l, m - 1);
	quickSort(array, m + 1, r);
}
