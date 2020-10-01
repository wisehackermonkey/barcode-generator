const test = require('tape');
const {crc_generate,string_to_array} = require('../crc.js');

test('returns the crc of a number for EAN-13 barcode', t => {
    t.equal(crc_generate("750103131130"), 9);
    t.equal(crc_generate("111111111111"), 6);
  t.end();
});


test('returns the crc of a number for EAN-13 barcode', t => {
    t.deepEqual(string_to_array("1011100"), [1, 0, 1, 1, 1, 0, 0]);
    t.deepEqual(string_to_array("0"), [0]);
  t.end();
});

