var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let numbers = [];
let searchNumbers = [];

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		// test
		// while (true)
		// {

		//  	let totalNumbers = Math.round(Math.random() * (10**3));
		//  	let totalSearchNumbers = Math.round(Math.random() * (10**3));
			 
			
		// 	 let numbers = []

		//  	for (let i=0; i<totalNumbers; i++){
		//  		numbers.push(Math.round(Math.random() * (10**6)));
		//  	}
		// 	numbers = numbers.sort((a, b) => parseInt(a)-parseInt(b));

		// 	let searchNumbers = []

		// 	for (let i=0; i<totalSearchNumbers; i++){
		// 		searchNumbers.push(Math.round(Math.random() * 10**3));
		// 	}
		   
		// 	for (let i=0; i<searchNumbers.length; i++){
		// 		let bRes = binarySearch(numbers, 0, numbers.length-1, searchNumbers[i]);
		// 		let lRes = linearSearch(numbers, searchNumbers[i]);
		// 		if (bRes !== lRes){
		// 			console.log(numbers, searchNumbers[i], bRes, lRes);
		// 			binarySearch(numbers, 0, numbers.length-1, searchNumbers[i]);

		// 		}
		// 	}

		// 	//console.log(arraySearch(numbers, searchNumbers));
		// //	if (maxSalary([...numbers]) !== maxSalary2([...numbers]))
		// // 	{
		// // 		console.log(numbers);
		// // 		process.exit()
		// // 	}
		// }

		let ns = [1,5,8,12,13];
		let ss = [];
		let rs = [-1];

		let doTest = (ns, ss, rs) => {
			for (let i=0; i<ss; i++)
			{
				if (binarySearch(ss[i]) !== rs[i]){
					console.log('Test failed', ns, ss, rs);
					return;
				}
			}
			console.log('Test OK');
		};
		doTest(ns, ss, rs);

		//console.log(arraySearch(5, 1, [1,5,8,12,13],[]) === '-1');
		
		ns = [1,5,8,12,13];
		ss = [8,1,23,1,11];
		rs = [2,0,-1, 0, -1];
		doTest(ns, ss, rs);

		ns = [1,2,3,4,5,6,7,8,9,10];
		ss = [2,3,4,5,6,7,8,9,10,11];
		rs = [1,2,3,4,5,6,7,8,9,-1];
		doTest(ns, ss, rs);

		ns = [1,2,3,4,5,6,7,8,9,10];
		ss = [2,3,4,5,6,7,8,9,10,11];
		rs = [1,2,3,4,5,6,7,8,9,-1];
		doTest(ns, ss, rs);

		
		ns = [1,2,3,4,5,6,7,8,9,10, 22,33,44,55,66,77,88,99,111,222,333,444,555,666,777,888,999,1111,2222,3333,4444,5555,6666,7777,8888,9999];
		ss = [2,9,54];
		rs = [1,8,-1];
		doTest(ns, ss, rs);

		process.exit();
	}

	if (lineNumber === 0) {
		let arr = line.toString().split(" ").map(x => parseInt(x,10));
		numbers = arr.slice(1);
	}

	if (lineNumber === 1) {
		let arr = line.toString().split(" ").map(x => parseInt(x,10));;
		searchNumbers = arr.slice(1);

		arraySearch(numbers, searchNumbers);
		
		process.exit();
	
	}
	lineNumber++;
	
}

function arraySearch(numbers, searchNumbers){
	for (let i=0; i<searchNumbers.length; i++){
		process.stdout.write(
			binarySearch(numbers, 0, numbers.length-1, 
				parseInt(searchNumbers[i])).toString());
		process.stdout.write(' ');
	}
}

function binarySearch(numbers, start, end, key)
{
	if (start > end || !key)
		return -1;

	let mid = Math.floor((end - start) / 2) + start;
	let numberAtIndex = parseInt(numbers[mid]);
	if (key === numberAtIndex){
		return mid;
	}
	else if (key > numberAtIndex) {
		return binarySearch(numbers, mid+1, end, key);
	} else if (key < numberAtIndex) {
		return binarySearch(numbers, start, mid-1, key);
	}
}

function linearSearch (numbers, key){
	for (let i=0; i<numbers.length; i++)
	{
		if (parseInt(numbers[i]) === parseInt(key)){
			return i;
		}
		else if (parseInt(key) < parseInt(numbers[i]))
		{
			break;
		}
		
	}
	return -1;
}