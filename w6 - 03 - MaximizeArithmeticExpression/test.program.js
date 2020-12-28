var assert = require("assert");
var program = require("./program");

describe("Maximize arithmetic expression", function () {
  describe("sample from exercise", function () {
    it("sample 0", function () {
      assert.strictEqual(program.processInput("1+5"), 6);
    });

    it("sample 1", function () {
      assert.strictEqual(program.processInput("5-8+7*4-8+9"), 200);
    });
  });
});
