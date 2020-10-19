var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let itemsN = 0;
let capacityW = 0;
let weights = [];
let values = [];

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		// test
		console.log(maxValue(3, 50, [60,100,120], [20, 50, 30]).toString() === "180.0000");
		console.log(maxValue(1, 10, [500], [30]).toString() === "166.6667");
		console.log(maxValue(3, 50, [60,100,120], [20, 50, 30]));
		console.log(maxValue(1, 10, [500], [30]));

		//console.log(maxValue());
		process.exit();
	}

	if (lineNumber === 0) {
		itemsN = parseInt(line.toString().split(' ')[0], 10);
		capacityW = parseInt(line.toString().split(' ')[1], 10);
		
//		return;
	}

	if (lineNumber >= 1) {
		const thisItem = line.toString().split(" ");
		values.push(parseInt(thisItem[0], 10));
		weights.push(parseInt(thisItem[1], 10));
//		return;
	}
	lineNumber++;
	if (lineNumber-1 === itemsN){
		//console.log(values, weights);

		// test
		//console.log(maxValue(3, 50, [60,100,120], [20, 50, 30]) === 180.0000);
		//console.log(maxValue(1, 10, [500], [30]) === 166.6667);

		console.log(maxValue(itemsN, capacityW, values, weights));
		process.exit();
	}
	//console.log(values, weights, itemsN, lineNumber);

	
}

function maxValue(itemsN, capacityW, values, weights)
{
	let sortedItems = values.map((v, i) => {
		return {
			unitValue: v / weights[i],
			value: v,
			weight: weights[i],
		}
	}).sort((item, item2) => item2.unitValue - item.unitValue );
	
	let accumulatedWeight = 0;
	let accumulatedValue = 0;
	
	while (accumulatedWeight < capacityW && sortedItems.length > 0){
		let item = sortedItems.shift();
		let amountWeightToTake = Math.min(capacityW - accumulatedWeight, item.weight);

	//	console.log(item, amountWeightToTake);
		if (amountWeightToTake > 0){
			accumulatedValue += item.unitValue * amountWeightToTake;
			accumulatedWeight += amountWeightToTake;
	//		console.log(accumulatedValue, accumulatedWeight);
		}
	}

	return accumulatedValue.toFixed(4);

}
