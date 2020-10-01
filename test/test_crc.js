const test = require('tape');
const {crc_generate} = require('../crc.js');

test('returns the crc of a number for EAN-13 barcode', t => {
    t.equal(crc_generate("750103131130"), 9);
    t.equal(crc_generate("111111111111"), 6);
  t.end();
});
