var assert = require('assert');
var program = require('./program');
describe('Number of inversion', function() {
  describe('success case', function() {
    it('simple case', function() {
      let ns = [2, 3, 9, 2, 9];
      assert.deepStrictEqual(program.mergeSort(ns), { array: [...ns].sort((a, b) => a-b), inversions: 2});
    })

    it('stress test (20x) - always the same input', function() {
        for (i=0;i<20;i++)
        {
          let ns = [13, 1, 222, 23, 4, 4, 4, 1000, 0, 4, 0, 0, 111, 123];
          let res = program.mergeSort(ns);
          assert.deepStrictEqual(res, { array: [...ns].sort((a, b) => a-b), inversions: 45});
        }
      })
  });
});

// while(true)
// {

// 	let length = Math.round(Math.random() * 3);
// 	ns = [];
// 	for (let i=0;i<length;i++){
// 		ns.push(Math.round(Math.random() * 10**9));
// 	}

// 	if(doTest(ns, [...ns].sort(function(a, b){return a-b})) === false)
// 		break;
// } 
