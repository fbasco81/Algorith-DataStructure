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
	if (lineNumber === 0) {
		n = parseInt(line.toString(),10);
	}

	if (lineNumber === 1) {
		numbers = line.toString().split(" ").map(x => parseInt(x,10));;
		
		let result = mergeSort(numbers); 
		console.log(result.inversions);

		process.exit();
	
	}
	lineNumber++;
	
}

function merge(array1, array2)
{
	let result = [];
	let inversion = 0;
	while (array1.length > 0 && array2.length > 0){
		if (array1[0] <= array2[0])
			result.push(array1.shift());
		else
		{
			inversion += array1.length;
			result.push(array2.shift());
		}
	}

	while (array1.length > 0){
		result.push(array1.shift());
	}

	while (array2.length > 0){
		result.push(array2.shift());
	}
	return { array: result, inversions: inversion };
}

function mergeSort(array){

	if (array.length<=1)
		return { array: array, inversions: 0 };

	let middle = Math.round(array.length / 2);

	let res1 = mergeSort([...array.slice(0,middle)]);
	let res2 = mergeSort([...array.slice(middle,array.length)]);

	let finalRes = merge(res1.array, res2.array);

	return { array: finalRes.array, inversions: res1.inversions + res2.inversions + finalRes.inversions };
}

module.exports = { mergeSort }; 