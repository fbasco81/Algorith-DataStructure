var assert = require("assert");
var program = require("./program");
describe("Primitive calculator", function () {
  describe("basic case (1)", function () {
    it("should return 0 when the input is 1", function () {
      assert.strictEqual(program.calculate(1), {
        operations: 0,
        sequence: [1],
      });
    });

    it("should return 3 when the input is 5", function () {
      assert.strictEqual(program.calculate(5), {
        operations: 3,
        sequence: [1, 2, 4, 5],
      });
    });

    it("should return 14 when the input is 96234", function () {
      assert.strictEqual(program.calculate(96234), {
        operations: 14,
        sequence: [1, 3,9,10,11,22,66,198,594,1782,5346,16038,16039,32078,96234],
      });
    });
  });
});
