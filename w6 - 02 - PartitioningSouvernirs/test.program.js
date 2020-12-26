var assert = require("assert");
var program = require("./program");

describe("Partitioning souvenir", function () {
  describe("sample from exercise", function () {
    it("sample 0", function () {
      assert.strictEqual(program.partition([1, 1, 1]), 1);
    });

    it("sample 1", function () {
      assert.strictEqual(program.partition([3, 3, 3, 3]), 0);
    });

    it("sample 2 ", function () {
      assert.strictEqual(program.partition([30]), 0);
    });

    it("sample 3 ", function () {
      assert.strictEqual(
        program.partition([1, 2, 3, 4, 5, 5, 7, 7, 8, 10, 12, 19, 25]),
        1
      );
    });
    it("sample 4 ", function () {
      assert.strictEqual(
        program.partition([25, 2, 8, 15, 1, 2, 3, 1, 1, 1, 1, 10, 3, 2]),
        1
      );
    });
  });
});
