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
		
		let doTest = (input, expected) => {
			let actual = mergeSort(input);
			if (actual.array.join(' ') !== expected.array.join(' '))
			{
				console.log('Test failed: found array' + res + ' expected:' + expected);
				return false;
				
			}

			if (actual.inversion !== expected.inversion)
			{
				console.log('Test failed: found inversion' + res + ' expected:' + expected);
				return false;
				
			}
			console.log('Test OK');
			return true;
		};

		// let ns = [2, 3, 9, 2, 2];
		// doTest(ns, [2,2, 2, 3, 9]);

		// ns = [3, 1, 2, 3, 4, 2, 1];
		// doTest(ns, [1,1, 2,2, 3,3,4]);

		// while(true)
		// {
		// 	ns = [13, 1, 222, 23, 4, 4, 4, 1000, 0, 4, 0, 0, 111, 123];
		// 	if(doTest(ns, ns.sort()) === false)
		// 		break;
		// }

		ns = [2, 3, 9, 2, 9];
		doTest(ns, { array: [...ns].sort(), inversions: 2});

		// while(true)
		// {

		// 	let length = Math.round(Math.random() * 3);
		// 	ns = [];
		// 	for (let i=0;i<length;i++){
		// 		ns.push(Math.round(Math.random() * 10**9));
		// 	}

		// 	if(doTest(ns, [...ns].sort(function(a, b){return a-b})) === false)
		// 		break;
		// } 
		

		

		process.exit();
	}

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

