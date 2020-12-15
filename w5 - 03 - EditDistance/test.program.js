var assert = require("assert");
var program = require("./program");
describe("Edit distance", function () {
  describe("case (1)", function () {
    it("should return 0 when the input is the same", function () {
      assert.strictEqual(program.distance("ab", "ab"), 0);
    });

    it("should return 3 when the input is shorts - ports", function () {
      assert.strictEqual(program.distance("ports", "short"), 3);
    });

    it("should return 5 when the input is editing - distance", function () {
      assert.strictEqual(program.distance("editing", "distance"), 5);
    });
  });
});
