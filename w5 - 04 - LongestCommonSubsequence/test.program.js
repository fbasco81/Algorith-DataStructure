var assert = require("assert");
var program = require("./program");

describe("Common subsequence", function () {
  describe("case base", function () {
    it("should return 2 ", function () {
      assert.strictEqual(program.getCommonSubsequence([2, 7, 5], [2, 5]), 2);
    });

    it("should return 0 ", function () {
      assert.strictEqual(program.getCommonSubsequence([7], [1, 2, 3, 4]), 0);
    });

    it("should return 2 ", function () {
      assert.strictEqual(
        program.getCommonSubsequence([2, 7, 8, 3], [5, 2, 8, 7]),
        2
      );
    });
  });
});
