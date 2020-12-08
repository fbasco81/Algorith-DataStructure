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
  if (line.toString().indexOf("test") >= 0) {
    let doTest = (starts, ends, points, expected) => {
      let actual = find(starts, ends, points);
      if (actual.join(" ") !== expected.join(" ")) {
        //console.log(
        //"Test failed" // +
        process.stdout.write(
          util
            .inspect(actual, { maxArrayLength: null })
            .replace("[", "")
            .replace("]", "")
            .replace(/,/g, "")
        );
        //  "Test failed: found array" + actual + " expected:" + expected
        //);
        return false;
      }

      // if (actual.inversion !== expected.inversion)
      // {
      // 	console.log('Test failed: found inversion' + res + ' expected:' + expected);
      // 	return false;

      // }
      console.log("Test OK");
      return true;
    };

    let starts = [
      { v: 0, t: "S" },
      { v: 7, t: "S" },
    ];
    let ends = [
      { v: 5, t: "E" },
      { v: 10, t: "E" },
    ];
    let points = [
      { v: 1, t: "P", i: 0 },
      { v: 6, t: "P", i: 1 },
      { v: 11, t: "P", i: 2 },
    ];
    doTest(starts, ends, points, [1, 0, 0]);

    starts = [
      { v: 3, t: "S" },
      { v: 0, t: "S" },
      { v: -3, t: "S" },
      { v: 7, t: "S" },
    ];
    ends = [
      { v: 2, t: "E" },
      { v: 5, t: "E" },
      { v: 2, t: "E" },
      { v: 10, t: "E" },
    ];
    points = [
      { v: 1, t: "P", i: 0 },
      { v: 6, t: "P", i: 1 },
      { v: 11, t: "P", i: 2 },
    ];

    doTest(starts, ends, points, [2, 0, 0]);

    starts = [
      { v: 3, t: "S" },
      { v: 0, t: "S" },
      { v: -3, t: "S" },
      { v: 7, t: "S" },
    ];
    ends = [
      { v: 5, t: "E" },
      { v: 5, t: "E" },
      { v: 2, t: "E" },
      { v: 10, t: "E" },
    ];
    points = [
      { v: 6, t: "P", i: 0 },
      { v: 1, t: "P", i: 1 },
      { v: 3, t: "P", i: 2 },
    ];
    doTest(starts, ends, points, [0, 2, 2]);

    for (let p = 0; p < 1; p++) {
      starts = [];
      ends = [];
      points = [];

      for (let i = 0; i < 50000; i++) {
        let a1 = 10 ** -8;
        let a2 = 10 ** 8;

        let p = Math.random() * 10 ** 7;

        starts.push({ v: a1, t: "S" });
        ends.push({ v: a2, t: "E" });
        points.push({ v: p, t: "P", i: i });
      }
      console.log("start test");
      doTest(starts, ends, points, [0, 2, 2]);
      console.log("end test");
    }
    process.exit();
  }

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
