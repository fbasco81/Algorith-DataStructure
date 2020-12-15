var readline = require("readline");

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", readLine);

function readLine(line) {
  if (line !== "\n") {
    var num = parseInt(line.toString(), 10);
    var result = calculate(num);

    console.log(result.operations);
    console.log(result.sequence.join(" "));

    process.exit();
  }
}

function generateSequence(value){
  let sequences = [
    {steps:0, valueBefore: 0, operation: ""},
    {steps:0, valueBefore: 0, operation:"+1"}
  ];
  
  for (let i=2; i<=value;i++)
  {
    let lastSequence = sequences[i-1];
    let valueBefore = i-1;
    let operation = "+1"
    
    if (i % 3 === 0){
      let index = Math.round(i/3);
      valueBefore = index;
      lastSequence = sequences[index];
      operation = "*3"
    }
    if (i % 2 === 0){
      let index = Math.round(i/2);
      if (sequences[index].steps < lastSequence.steps){
        valueBefore = index;
        lastSequence = sequences[index];
        operation = "*2"
      }
    }
    
    sequences[i] = {
      steps:lastSequence.steps+1, 
      valueBefore: valueBefore, 
      operation: operation
    };
  }
  return sequences;
}

function calculate(amount) {
  
  let allSequences = generateSequence(amount);
  let result = { 
    operations: allSequences[amount].steps, 
    sequence: []
  };

  while (amount > 0){
    result.sequence.unshift(amount);
    amount = allSequences[amount].valueBefore;
  }

  return result;
}

module.exports = { calculate };
