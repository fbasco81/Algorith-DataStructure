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
			quickSort(actual, 0, actual.length-1);
			if (actual.join(' ') !== expected.join(' '))
			{
				console.log('Test failed: found' + actual + ' expected:' + expected);
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

		ns = [1, 1, 2, 2, 2, 2, 2, 3, 3, 1, 4, 4, 1, 1];
		doTest(ns, [...ns].sort());

		while(true)
		{

			let length = Math.round(Math.random() * 3);
			ns = [];
			for (let i=0;i<length;i++){
				ns.push(Math.round(Math.random() * 10**9));
			}

			if(doTest(ns, [...ns].sort(function(a, b){return a-b})) === false)
				break;
		} 
		

		

		process.exit();
	}

	if (lineNumber === 0) {
		n = parseInt(line.toString(),10);
	}

	if (lineNumber === 1) {
		numbers = line.toString().split(" ").map(x => parseInt(x,10));;
		
		quickSort(numbers, 0, numbers.length-1); 
		for (let i=0; i<numbers.length; i++){
			process.stdout.write(numbers[i].toString());
			process.stdout.write(' ');
		}

		process.exit();
	
	}
	lineNumber++;
	
}
function swap(array, i, j){
	let t = array[i];
	array[i] = array[j];
	array[j] = t;
}

function partition3(array, l, r){

	let number = array[l];
	let index1 = l;
	let equalCount = 0;
	for (let i = l + 1; i <= r; i++) {
		if (array[i] < number) {
			index1++;
			swap(array, i, index1);
			if (equalCount>0){
				swap(array, i, index1+equalCount);
			}
		}
		else if (array[i] === number) {
			equalCount++;
			swap(array, i, index1+equalCount);
		}
	}
	swap(array, l, index1);
	return [index1, index1+equalCount];
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
	let k = Math.round((Math.random() * (r - l))) + l;
	//console.log('k='+k+',l='+l+'r='+r);
	swap(array, l, k);
	//use partition3
	let m = partition3(array, l, r);
	quickSort(array, l, m[0] - 1);
	quickSort(array, m[1] + 1, r);
}
