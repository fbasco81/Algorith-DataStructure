var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let segments = [];
let points = [];
let segmentNumber = 0;
let pointNumber = 0;

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		
		let doTest = (segments, points, expected) => {
			let actual = find(segments, points);
			if (actual.array.join(' ') !== expected.array.join(' '))
			{
			 	console.log('Test failed: found array' + res + ' expected:' + expected);
				return false;
			}

			// if (actual.inversion !== expected.inversion)
			// {
			// 	console.log('Test failed: found inversion' + res + ' expected:' + expected);
			// 	return false;
				
			// }
			console.log('Test OK');
			return true;
		};

		let segments = [{a1: 0, a2: 5}, {a1: 7, a2: 10}];
		let points = [1,6,11];		
		doTest(segments, points, [1, 0, 0]);
		process.exit();
	}

	if (lineNumber === 0) {
		segmentNumber = parseInt(line.toString().split(" ")[0],10);
		pointNumber = parseInt(line.toString().split(" ")[1],10);
	}

	if (lineNumber > 0 && lineNumber <= segmentNumber) { 
		let tmpArr = line.toString().split(" ");
		segments.push(new {a1: parseInt(tmpArr[0],10), a2: parseInt(tmpArr[1],10)});
	}

	if (lineNumber > segmentNumber) { 
		let tmpArr = line.toString().split(" ");
		for (let i=0; i<tmpArr.length; i++){
			points.push(parseInt(tmpArr[i],10));
		}

		let result = find(segments, points); 
		for (let i=0; i<result.length; i++){
			process.stdout.write(result[i].toString());
			process.stdout.write(' ');
		}

		process.exit();
	}
	lineNumber++;
	
}

function find(segments, points)
{
	let orderedSegments = segments.sort( (a, b) => a.a1 < b.a1 ? -1 : 1);
	let result = [];
	for (var i=0; i<points.length; i++){
		let index = binarySearchSegments(orderedSegments, points[i], 0, orderedSegments.length-1);
		result.push(index > 0 ? 1 : 0);
	}
	return result;
}

function findRanges(segments, point, start, end){

	let left = start;
	let right = end;
	while(0 === 1){
		let mid = Math.floor((end - start) / 2) + start;
		let a1 = parseInt(segments[mid].a1);
		
		if (point >= a1){
			left = mid;
		}
		else {
			start = ;
		}

	}

	if (start > end || !point)
		return -1;

	let mid = Math.floor((end - start) / 2) + start;
	let a1 = parseInt(segments[mid].a1);
	
	if (point >= a1){
		return mid;
	}
	else if (point > a1) {
		return -1;
	} else if (point < a1) {
		return reduceLeftSegments(segments, point, start, mid-1);
	}
}
