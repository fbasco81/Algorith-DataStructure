var assert = require("assert");
var program = require("./program");

describe("Maximize gold", function () {
  describe("sample from exercise", function () {
    it("should return 9 ", function () {
      assert.strictEqual(program.gold(10, [1, 4, 8]), 9);
    });

    it("should return 10 ", function () {
      assert.strictEqual(program.gold(10, [1, 2, 3, 4]), 10);
    });
  });
});
