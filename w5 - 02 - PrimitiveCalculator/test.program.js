var assert = require('assert');
var program = require('./program');
describe('Money change', function() {
  describe('success case', function() {
    it('should return 2 when the amount is 2', function() {
      assert.strictEqual(program.changeCoins(2), 2);
    })

    it('should return 9 when the amount is 34', function() {
        assert.strictEqual(program.changeCoins(34), 9);
      })
  });
});
