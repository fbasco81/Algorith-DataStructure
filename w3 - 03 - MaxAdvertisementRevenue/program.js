var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
	input: process.stdin,
	terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let adsNumber = 0;
let profitPerClick = [];
let averageClicks = [];

function readLine(line) {

	if (line.toString().indexOf('test') >= 0){
		// test
		console.log(maxValue(5, [1,2,3,4,5], [1,0,1,0,1]) === 12);
		console.log(maxValue(1, [23], [39]) === 897);
		console.log(maxValue(3, [1,3,-5], [-2,4,1]) === 23);
		console.log(maxValue(10, [1,3,-6,-5,-8,12,0,5,7,2], [20,12,1,3,2,4,1,-40,1,2]) === 679);
	

		//console.log(maxValue());
		process.exit();
	}

	if (lineNumber === 0) {
		adsNumber = parseInt(line.toString(), 10);
	}

	if (lineNumber === 1) {
		profitPerClick = line.toString().split(" ").map(n => parseInt(n, 10));
	}

	if (lineNumber === 2) {
		averageClicks = line.toString().split(" ").map(n => parseInt(n, 10));
	}

	lineNumber++;
	if (lineNumber === 3){
		//console.log(values, weights);

		console.log(maxValue(adsNumber, profitPerClick, averageClicks));
		process.exit();
	}
	//console.log(values, weights, itemsN, lineNumber);

	
}

function maxValue(adsNumber, profitPerClick, averageClicks)
{
	let pProducts = productsPositiveValue(adsNumber, profitPerClick, averageClicks);
	let nProducts = productsNegativeValue(adsNumber, profitPerClick, averageClicks);

	let allProducts = [...pProducts,...nProducts];
	return allProducts.sort((x1,x2) => parseInt(x2,10) - parseInt(x1, 10))
				.slice(allProducts.length - adsNumber, allProducts.length)
				.reduce((prev, cur) => prev + cur);
}

function productsPositiveValue(adsNumber, profitPerClick, averageClicks)
{
	profitPerClick = profitPerClick.filter(x => x >= 0).sort((x1,x2) => parseInt(x2,10) - parseInt(x1, 10));
	averageClicks = averageClicks.filter(x => x >= 0).sort((x1,x2) => parseInt(x2,10) - parseInt(x1, 10));
	
	let products = [];
	for (let i=0; i<adsNumber; i++)
	{
		if (profitPerClick[i] !== undefined && 
			averageClicks[i] != undefined){
			products.push(profitPerClick[i] * averageClicks[i]);
		}
	}
	return products;
}

function productsNegativeValue(adsNumber, profitPerClick, averageClicks)
{
	profitPerClick = profitPerClick.filter(x => x < 0).sort((x1,x2) => parseInt(x1,10) - parseInt(x2, 10));
	averageClicks = averageClicks.filter(x => x < 0).sort((x1,x2) => parseInt(x1,10) - parseInt(x2, 10));
	
	let products = [];
	for (let i=0; i<adsNumber; i++)
	{
		if (profitPerClick[i] !== undefined &&
			averageClicks[i] !== undefined){
			products.push(profitPerClick[i] * averageClicks[i]);
		}
	}
	return products;
}
