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
		
		
		
		let doTest = (ns, n) => {
			let majority = findMajority(ns, 0, ns.length-1);
			if (findMajority(ns, 0, ns.length-1) !== n)
			{
				console.log('Test failed: found' + majority + ' expected:' + n,ns);
				return;
				
			}
			console.log('Test OK');
		};

		let ns = [1, 2, 3, 1];
		doTest(ns, -1);

		ns = [2, 3, 9, 2, 2];
		doTest(ns, 2);

		ns = [1, 2, 3, 4];
		doTest(ns, -1);

		ns = [2, 3, 9, 2, 2, 9, 9 , 9 , 9 , 9];
		doTest(ns, 9);

		ns = [1, 15, 1, 2, 3, 4, 5 , 6 , 7 , 8];
		doTest(ns, -1 );

		ns = [512766168, 717383758, 5, 126144732, 5, 573799007, 5, 5, 5, 405079772];
		doTest(ns, -1 );

		process.exit();
	}

	if (lineNumber === 0) {
		n = parseInt(line.toString(),10);
	}

	if (lineNumber === 1) {
		numbers = line.toString().split(" ").map(x => parseInt(x,10));;
		
		let majorElement = findMajority(numbers, 0, numbers.length-1); 
		console.log(majorElement > 0 ? "1" : "0");
		
		process.exit();
	
	}
	lineNumber++;
	
}

function findMajority(numbers, start, end){
	if (start === end)
		return numbers[start];

	let mid = start + Math.floor((end - start) / 2);
	
	let left = findMajority(numbers, start, mid);
	let right = findMajority(numbers, mid+1, end);

	if (left === right)
		return left;

	let howManyLeft = 0;
	let howManyRight = 0; 
	for (let i=start; i<=end; i++){
		if (numbers[i] === left)
			howManyLeft ++;
		if (numbers[i] === right)
			howManyRight ++;
	}

	let half = Math.round((end - start) / 2);
	if (howManyLeft > half)
		return left;
	else if (howManyRight >  half)
		return right;
	return -1;
}
