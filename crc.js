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
exports.crc_generate = crc_generate

