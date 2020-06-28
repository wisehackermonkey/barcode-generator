# barcode-generator
 p5.js app to generate barcodes given some data
[![P5.js](https://img.shields.io/badge/P5.js-Enabled-pink.svg)](https://shields.io/)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```
by oran collins
github.com/wisehackermonkey
oranbusiness@gmail.com
20200625
```

# Live Demo
# [click here](#)



# Dev Log


- [EAN-13](https://en.wikipedia.org/wiki/International_Article_Number)
- [UPC-A](https://en.wikipedia.org/wiki/Universal_Product_Code)

# semi-working barcode untested
![](./Screenshot_3.png)

# try 2
![](https://i.postimg.cc/NFGQYcWQ/screenshot-3.png)

#### great example 
- [EAN-13 BACKGROUND INFORMATION](http://www.barcodeisland.com/ean13.phtml)

# TODO list

# brain storming
- map array of bits to pixels
- map array to lines 
- test barcode with scanner
    - to test array to pixel use example data
- helper function that turns numbers into [l,g,r]-digits (encoded) bit pattern
- combine multiple digits into one array
- way to indicate start, center and end markers

### example of a barcode v1
```
start    data        center                 end
101  | <42 digits> | 01010 |  <42 digits> | 101
```

```
open questions what are arias?
how does parity work for this thing?
is it actaull 13 digit max
```

pattern mapping
```
first digit = 13
mapping is LLGLGG

L for digit 5
is 0110001


8 = LGLGGL and RRRRRR

8 711253 001202
expands to 
011101101100110011001001101101110010111101



simple case 

101 01010 101
```


# TODO
- render a actual example barcode and have it read correctly
    - i suspect some issue is happening  