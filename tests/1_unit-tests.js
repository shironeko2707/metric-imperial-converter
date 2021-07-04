const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Unit Tests', function(){
    test('whole number test', () => {
      assert.typeOf(convertHandler.getNum('154l'), 'number')
    });

    test('decimal input test', () => {
      assert.typeOf(convertHandler.getNum('1.3l'), 'number');
    });

    test('fractional input test', () => {
      assert.typeOf(convertHandler.getNum('145/32km'), 'number')
    });

    test('fractional input with decimal test', () => {
      assert.typeOf(convertHandler.getNum('5.4/5km'), 'number')
    })

    test('error on double fraction', () => {
      assert.deepEqual(convertHandler.getNum('1/2/3lbs'), { "error": "invalid number" })
    });

    test('if no decimal input default 1', () => {
      assert.strictEqual(convertHandler.getNum('gal'), 1);
    });

    test('correctly read each valid input units', () => {
      assert.strictEqual(convertHandler.getUnit('3l'), 'l');
      assert.strictEqual(convertHandler.getUnit('34gal'), 'gal');
      assert.strictEqual(convertHandler.getUnit('7km'), 'km');
      assert.strictEqual(convertHandler.getUnit('5mi'), 'mi');
      assert.strictEqual(convertHandler.getUnit('100kg'), 'kg');
      assert.strictEqual(convertHandler.getUnit('50lbs'), 'lbs');
    });

    test('error on invalid unit', () => {
      assert.deepEqual(convertHandler.getReturnUnit('3min'), { "error": "invalid unit"})
    });

    test('return correct unit for valid input unit', () => {
      assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    });

    test('spelled-out string for valid input unit', () => {
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds')
    });

    test('correctly convert gal to L', () => {
      assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
    });

    test('correctly convert L to gal', () => {
      assert.strictEqual(convertHandler.convert(10, 'L'), 2.64172);
    });

    test('correctly convert mi to km', () => {
      assert.strictEqual(convertHandler.convert(100, 'mi'), 160.93400);
    });

    test('correctly convert km to mi', () => {
      assert.strictEqual(convertHandler.convert(60, 'km'), 37.28236)
    });

    test('correcly convert lbs to kg', () => {
      assert.strictEqual(convertHandler.convert(15, 'lbs'), 6.80388);
    });

    test('correctly convert kg to lbs', () => {
      assert.strictEqual(convertHandler.convert(15, 'kg'), 33.06937)
    })

  })
});