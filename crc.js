// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20201001

// this function was taken from 
// special thanks to BarCodeIsland.com
// http://www.barcodeisland.com/ean13.phtml
function CalculateEAN13Checksum(messageString,checksumDigit)
{
 var csumTotal = 0; // The checksum working variable starts at zero

 // If the source message string is less than 12 characters long, we make it 12 characters

 if( messageString.length < 12 )
  {
  var holdString = '000000000000' + messageString;
  messageString = holdString.substring(holdString.length - 12, holdString.length);
  }

 // Calculate the checksum value for the message

 for( charPos = messageString.length - 1; charPos >= 0; charPos--) 
  {
  if( charPos / 2 == parseInt(charPos/2) )
   csumTotal = csumTotal + (parseInt(messageString.substring(charPos,charPos+1)));
  else
   csumTotal = csumTotal + (3 * parseInt(messageString.substring(charPos,charPos+1)));
  }

 // Calculate the checksum digit

 var remainder = csumTotal - parseInt(csumTotal/10) * 10;
 if( remainder == 0 )
  checksumDigit = '0';
 else
  checksumDigit = 10 - remainder;
return checksumDigit

}
var crc_generate = (number) => {
    return CalculateEAN13Checksum(number,0)
}

// The raw bit pattern encodings for each 0-9 digits
// these magic values are pulled from this wikipdea page
// https://en.wikipedia.org/wiki/International_Article_Number
let g_encoding = [
    "0100111",
    "0110011",
    "0011011",
    "0100001",
    "0011101",
    "0111001",
    "0000101",
    "0010001",
    "0001001",
    "0010111",
];

let l_encoding = [
    "0001101",
    "0011001",
    "0010011",
    "0111101",
    "0100011",
    "0110001",
    "0101111",
    "0111011",
    "0110111",
    "0001011",
];
let r_encoding = [
    "1110010",
    "1100110",
    "1101100",
    "1000010",
    "1011100",
    "1001110",
    "1010000",
    "1000100",
    "1001000",
    "1110100",
];

// bit pattern encoding see wiki for more info
let num_structure = [
    "LLLLLL",
    "LLGLGG",
    "LLGGLG",
    "LLGGGL",
    "LGLLGG",
    "LGGLLG",
    "LGGGLL",
    "LGLGLG",
    "LGLGGL",
    "LGGLGL",
];

// convert string to an array of numbers
//"1011100" -> [1, 0, 1, 1, 1, 0, 0]
let string_to_array = (binary_string) => {
    return binary_string.split("").map((x) => {
        return parseInt(x);
    });
};

// number encoding using r l or g, encodings fallowing the EAN-13 encoding skeme
let map_structure_to_bits = (encoding, numbers) => {
    nums_map = string_to_array(numbers);
    return encoding.split("").reduce((accumulator, digit_type, index) => {
        if (digit_type == "G") {
            return accumulator + g_encoding[nums_map[index]];
        } else if (digit_type == "L") {
            return accumulator + l_encoding[nums_map[index]];
        } else if (digit_type == "R") {
            return accumulator + r_encoding[nums_map[index]];
        }
    }, "");
};

// fully encoded bit string of a barcode including crc
let generate_bit_pattern = (number_string) => {
    pattern_number = parseInt(number_string[0])
    
    encding_pattern = num_structure[pattern_number]

    number_string += crc_generate(number_string)

    number_string = number_string.slice(1)

    left_group = number_string.slice(0,6)
    right_group = number_string.slice(6,12)

    let left_bit_pattern = map_structure_to_bits(encding_pattern, left_group);
    //note: "RRRRRR" is always used because the EAN-13 standard has the right group's
    // encoding never change see WIKI article about it
    let right_bit_pattern = map_structure_to_bits("RRRRRR",right_group);
    return `101${ left_bit_pattern }01010${ right_bit_pattern }101`

};
exports.crc_generate = crc_generate
exports.string_to_array = string_to_array
exports.map_structure_to_bits = map_structure_to_bits
exports.generate_bit_pattern = generate_bit_pattern

