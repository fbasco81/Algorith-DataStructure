var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let segmentN = 0;
let start = [];
let end = [];

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		// test
		let test = calculate([1, 2, 3], [3, 5, 6]);
		console.log(test.length === 1);
		console.log(arraysEqual(test,[3]));

		test = calculate([4, 1, 2, 5], [7, 3, 5, 6]);
		console.log(test.length === 2);
		console.log(arraysEqual(test, [3, 6]));

		test = calculate([10, 78, 26, 83, 22, 86, 52, 49, 63, 54], [10, 78, 26, 84, 24, 87, 54, 51, 64, 54]);
		console.log(test.length === 9);
		console.log(arraysEqual(test, [10, 22, 26, 49, 54, 63, 78, 83, 86]));
		
		test = calculate(
			[41, 52, 63, 80, 78, 35, 22, 31, 44, 81, 36, 10, 1, 23, 32, 87, 55, 69,
			89, 93, 38, 33, 14, 57, 70, 36, 29, 73, 70, 36, 29, 73, 66, 36, 1, 49,
			68, 26, 30, 1, 64, 57, 58, 51, 41, 17, 45, 4, 0, 65, 92, 84, 75, 39, 15,
			29, 83, 12, 91, 83, 81, 3, 66, 8, 17, 86, 44, 34, 74, 94, 79, 29, 60, 58,
			62, 54, 58, 79, 89, 40, 2, 12, 5, 28, 35, 7, 82, 49, 2, 57, 25, 52, 48, 9,
			10, 78, 26, 83, 22, 86, 52, 49, 63, 64], 
			[42, 52, 63, 82, 79, 35, 23, 32, 45, 82, 38, 12, 1, 23, 33, 88, 56, 71,
			91, 93, 40, 34, 16, 59, 72, 36, 29, 74, 72, 36, 29, 74, 68, 38, 3, 50,
			70, 28, 30, 2, 65, 58, 58, 53, 41, 18, 46, 4, 1, 67, 93, 85, 77, 41, 15,
			31, 84, 14, 93, 84, 81, 4, 67, 8, 19, 87, 44, 34, 74, 95, 81, 29, 61, 59,
			62, 56, 58, 79, 91, 42, 4, 14, 5, 28, 36, 8, 84, 51, 4, 59, 27, 53, 49, 9,
			10, 78, 26, 84, 24, 87, 54, 51, 64, 54]);
		console.log(test.length === 43);
		console.log(arraysEqual(test, [1, 4, 5, 8, 9, 10, 14, 15, 18, 23, 26, 28,
			 29, 30, 32, 34, 35, 36, 40, 41, 44, 46, 49, 52, 54, 56, 58, 61, 62,
			 63, 65, 67, 70, 74, 77, 78, 79, 81, 84, 87, 91, 93, 95]));

		process.exit();
	}

	if (lineNumber === 0) {
		segmentN = parseInt(line.toString(), 10);
	}

	if (lineNumber >= 1) {
		const thisItem = line.toString().split(" ");
		start.push(parseInt(thisItem[0], 10));
		end.push(parseInt(thisItem[1], 10));
	}
	lineNumber++;
	if (lineNumber-1 === segmentN){
		//console.log(values, weights);

		// test
		//console.log(maxValue(3, 50, [60,100,120], [20, 50, 30]) === 180.0000);
		//console.log(maxValue(1, 10, [500], [30]) === 166.6667);

		let result = calculate(start, end); 
		console.log(result.length);
		console.log(result.join(' '));
		
		process.exit();
	}
	//console.log(values, weights, itemsN, lineNumber);

	
}

function calculate(start, end)
{
	let sortedItems = start.map((v, i) => {
		return {
			from: v,
			to: end[i],
		}
	}).sort((item, item2) => (item.from - item2.from) != 0 ?
								item.from - item2.from : 
								item.to - item2.to);
	
	let refSegment = sortedItems.shift();
	let points = [];
	while (sortedItems.length > 0){
		let segment = sortedItems.shift();
		addPoint = false;
		if (segment.from >= refSegment.from && segment.from <= refSegment.to){
			refSegment.from = segment.from;
		}
		if (segment.to < refSegment.to){
			refSegment.to = segment.to;
		}
		if (segment.from > refSegment.to){
			points.push(refSegment.from);
			refSegment.from = segment.from;
			refSegment.to = segment.to;
		}
	}
	points.push(refSegment.from);


	return points;

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