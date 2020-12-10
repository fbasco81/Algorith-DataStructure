var assert = require('assert');
var program = require('./program');
describe('Organize lottery', function() {
  describe('success case', function() {
    it('2 segments, 3 points', function() {
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
      assert.deepStrictEqual(program.find(starts, ends, points), [1, 0, 0]);
    })

    it('4 segments, 3 points', function() {
      let starts = [
        { v: 3, t: "S" },
        { v: 0, t: "S" },
        { v: -3, t: "S" },
        { v: 7, t: "S" },
      ];
      let ends = [
        { v: 2, t: "E" },
        { v: 5, t: "E" },
        { v: 2, t: "E" },
        { v: 10, t: "E" },
      ];
      let points = [
        { v: 1, t: "P", i: 0 },
        { v: 6, t: "P", i: 1 },
        { v: 11, t: "P", i: 2 },
      ];
      assert.deepStrictEqual(program.find(starts, ends, points), [2, 0, 0]);
      })

      it('stress test 10 times', function() {
        for (let p = 0; p < 10; p++) {
          let starts = [];
          let ends = [];
          let points = [];
          let expectedResult = [];

          for (let i = 0; i < 50000; i++) {
            let a1 = 10 ** -8;
            let a2 = 10 ** 8;
    
            let p = Math.random() * 10 ** 7;
    
            starts.push({ v: a1, t: "S" });
            ends.push({ v: a2, t: "E" });
            points.push({ v: p, t: "P", i: i });

            expectedResult[i] = 50000;
          }
          
          assert.deepStrictEqual(program.find(starts, ends, points), expectedResult);
        }
        
      })
  });
});

