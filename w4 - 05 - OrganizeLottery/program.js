var readline = require("readline");
var util = require("util");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);
let lineNumber = 0;
let starts = [];
let ends = [];
let points = [];
let segmentNumber = 0;

function readLine(line) {
  if (lineNumber === 0) {
    segmentNumber = parseInt(line.toString().split(" ")[0], 10);
    pointNumber = parseInt(line.toString().split(" ")[1], 10);
  }

  if (lineNumber > 0 && lineNumber <= segmentNumber) {
    let tmpArr = line.toString().split(" ");
    starts.push({ v: parseInt(tmpArr[0], 10), t: "S" });
    ends.push({ v: parseInt(tmpArr[1], 10), t: "E" });
  }

  if (lineNumber > segmentNumber) {
    let tmpArr = line.toString().split(" ");
    for (let i = 0; i < tmpArr.length; i++) {
      points.push({ v: parseInt(tmpArr[i], 10), t: "P", i: i });
    }

    let result = find(starts, ends, points);

    for (let i = 0; i < result.length; i++) {
      process.stdout.write(result[i].toString());
      process.stdout.write(" ");
    }

    process.exit();
  }
  lineNumber++;
}

function find(starts, ends, points) {
  let allValues = [...starts, ...ends, ...points].sort((a, b) => {
    if (a.v === b.v) {
      return getSortValue(a.t) - getSortValue(b.t);
    }
    return a.v - b.v;
  });

  let result = new Array(points.length);
  let openSegments = 0;
  for (let i = 0; i < allValues.length; i++) {
    let thisValue = allValues[i];

    if (thisValue.t === "S") {
      openSegments++;
    } else if (thisValue.t === "E") {
      openSegments--;
    } else {
      result[thisValue.i] = openSegments;
    }
  }
  return result;
}

function getSortValue(pointType) {
  switch (pointType) {
    case "S":
      return 0;
    case "P":
      return 1;
    case "E":
      return 2;
  }
}

module.exports = { find };