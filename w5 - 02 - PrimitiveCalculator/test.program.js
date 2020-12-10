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
  });
});
