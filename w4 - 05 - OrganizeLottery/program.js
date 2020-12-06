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
  if (line.toString().indexOf("test") >= 0) {
    let doTest = (segments, points, expected) => {
      let actual = find(segments, points);
      if (actual.join(" ") !== expected.join(" ")) {
        console.log(
          "Test failed: found array" + actual + " expected:" + expected
        );
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

    let segments = [
      { a1: 0, a2: 5 },
      { a1: 7, a2: 10 },
    ];
    let points = [
      { v: 1, i: 0 },
      { v: 6, i: 1 },
      { v: 11, i: 2 },
    ];
    doTest(segments, points, [1, 0, 0]);

    segments = [
      { a1: 3, a2: 2 },
      { a1: 0, a2: 5 },
      { a1: -3, a2: 2 },
      { a1: 7, a2: 10 },
    ];
    points = [
      { v: 1, i: 0 },
      { v: 6, i: 1 },
    ];
    doTest(segments, points, [2, 0]);

    segments = [
      { a1: 3, a2: 3 },
      { a1: 0, a2: 5 },
      { a1: -3, a2: 2 },
      { a1: 7, a2: 10 },
    ];
    points = [
      { v: 6, i: 0 },
      { v: 1, i: 1 },
      { v: 3, i: 2 },
    ];
    doTest(segments, points, [0, 2, 2]);

    for (let p = 0; p < 1000; p++) {
      segments = [];
      points = [];

      for (let i = 0; i < 50000; i++) {
        let a1 = Math.random() * 10 ** 7;
        let a2 = Math.random() * 10 ** 7 + a1;

        let p = Math.random() * 10 ** 7;

        segments.push({ a1: a1, a2: a2 });
        points.push(p);
      }
      console.log("start test");
      doTest(segments, points, [0, 2, 2]);
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
    segments.push({ a1: parseInt(tmpArr[0], 10), a2: parseInt(tmpArr[1], 10) });
  }

  if (lineNumber > segmentNumber) {
    let tmpArr = line.toString().split(" ");
    for (let i = 0; i < tmpArr.length; i++) {
      points.push({ v: parseInt(tmpArr[i], 10), i: i });
    }

    let result = find(segments, points);
    for (let i = 0; i < result.length; i++) {
      process.stdout.write(result[i].toString());
      process.stdout.write(" ");
    }

    process.exit();
  }
  lineNumber++;
}

function find(segments, points) {
  let orderedSegments = segments.sort((a, b) => (a.a1 < b.a1 ? -1 : 1));
  let orderedPoints = points.sort((a, b) => (a.v < b.v ? -1 : 1));

  let result = [];
  let segmentStartIndex = 0;

  while (orderedPoints.length > 0) {
    let thisPoint = orderedPoints.shift();
    result[thisPoint.i] = 0;
    // fast forward segment
    if (segmentStartIndex < orderedSegments.length) {
      while (
        segmentStartIndex < orderedSegments.length &&
        thisPoint.v > orderedSegments[segmentStartIndex].a2
      ) {
        segmentStartIndex++;
      }

      let segmentTemporaryIndex = segmentStartIndex;
      while (
        segmentTemporaryIndex < orderedSegments.length &&
        thisPoint.v >= orderedSegments[segmentTemporaryIndex].a1 &&
        thisPoint.v <= orderedSegments[segmentTemporaryIndex].a2
      ) {
        result[thisPoint.i]++;
        segmentTemporaryIndex++;
      }
    }
  }
  return result;
}

function find2(segments, points) {
  let orderedSegments = segments.sort((a, b) => (a.a1 < b.a1 ? -1 : 1));
  let result = [];
  for (var i = 0; i < points.length; i++) {
    let filteredSegments = orderedSegments.filter(
      (item) => item.a1 <= points[i] && item.a2 >= points[i]
    );
    result[i] = filteredSegments.length;
    // let indexLeft = findIndexSegmentsLeft(orderedSegments, points[i], 0, orderedSegments.length-1);
    // result[i] = 0;
    // for (let j=indexLeft;  j<orderedSegments.length;j++){
    // 	if (orderedSegments[j].a2 >= points[i]){
    // 		result[i]++;
    // 	}
    // }
  }
  return result;
}

function findIndexSegmentsLeft(segments, point, start, end) {
  let startIndex = -1;
  let left = start;
  let right = end;

  while (right > left) {
    if (point >= segments[right].a1 && point <= segments[right].a2) {
      startIndex = right;
    } else {
      right--;
    }

    if (
      startIndex === -1 &&
      point >= segments[left].a1 &&
      point <= segments[left].a2
    ) {
      startIndex = left;
    } else {
      return startIndex;
    }

    if (right - left > 1) {
      let mid = Math.floor((right - left) / 2) + left;
      a1 = parseInt(segments[mid].a1);

      if (point >= segments[mid].a1 && point <= segments[mid].a2) {
        left = mid;
      } else {
        right = mid;
      }
    }
  }
  return startIndex;
}
