var assert = require("assert");
const { generateWords } = require("./program");
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

    it("should return true ", function () {
      for (var i = 0; i < 100; i++) {
        var rnd = Math.round(Math.random() * 100);
        var words = generateWords(2);

        var distance1 = program.distance(words[0], words[1]);
        var distance2 = program.levenshteinDistance(words[0], words[1]);
        assert.strictEqual(distance1, distance2, words[0] + " !== " + words[1]);
      }
    });
  });
});
