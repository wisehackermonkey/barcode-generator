const test = require('tape');
const {
    crc_generate,
    string_to_array,
    map_structure_to_bits,
    generate_bit_pattern
} = require('../crc.js');

test('returns the crc of a number for EAN-13 barcode', t => {
    t.equal(crc_generate("750103131130"), 9);
    t.equal(crc_generate("111111111111"), 6);
  t.end();
});


test('returns number array from number string', t => {
    t.deepEqual(string_to_array("1011100"), [1, 0, 1, 1, 1, 0, 0]);
    t.deepEqual(string_to_array("0"), [0]);
  t.end();
});



test('returns number encoding using r l or g, encodings fallowing the EAN-13 encoding sceme', t => {
    t.equal(map_structure_to_bits("LLLLLL", `003994`), "000110100011010111101000101100010110100011");
    t.equal(map_structure_to_bits("LGLGLG", `711253`), "011101101100110011001001101101100010100001");
    t.equal(map_structure_to_bits("LGLGLG", `000000`), "000110101001110001101010011100011010100111");
  t.end();
});

test('returns fully encoded bit string of a barcode including crc', t => {
    t.equal(generate_bit_pattern("750103131130"), "10101100010100111001100101001110111101011001101010100001011001101100110100001011100101110100101");
  t.end();
});