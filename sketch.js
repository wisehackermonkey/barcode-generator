// barcode generator
// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20200625
// TODO add debug coloring

let debug = true;

// let g_encoding = {0: "0100111",1: "0110011",2: "0011011",3: "0100001",4: "0011101",5: "0111001",6: "0000101",7: "0010001",8: "0001001",9: "0010111",}
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

// let encoder = {"R":[],"G":[],"L":[]}
// Encoding of the digits
// Digit L-code	G-code	R-code
// 0	0001101	0100111	1110010
// 1	0011001	0110011	1100110
// 2	0010011	0011011	1101100
// 3	0111101	0100001	1000010
// 4	0100011	0011101	1011100
// 5	0110001	0111001	1001110
// 6	0101111	0000101	1010000
// 7	0111011	0010001	1000100
// 8	0110111	0001001	1001000
// 9	0001011	0010111	1110100

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

// Structure of EAN-13
// First digit	First group of 6 digits	Last group of 6 digits
// 0	LLLLLL	RRRRRR
// 1	LLGLGG	RRRRRR
// 2	LLGGLG	RRRRRR
// 3	LLGGGL	RRRRRR
// 4	LGLLGG	RRRRRR
// 5	LGGLLG	RRRRRR
// 6	LGGGLL	RRRRRR
// 7	LGLGLG	RRRRRR
// 8	LGLGGL	RRRRRR
// 9	LGGLGL	RRRRRR

let current = 0;

let example_bit_pattern;


let bar_height = 100;
let bar_spacing = .7;
let bar_location 
let barwidth = 2;
function setup() {
    createCanvas(800, 800);
    bar_location = createVector(width / 3, width / 3);
    noSmooth()
    // noStroke()
    // LEFT GUARD BARS (always the same): 101.
    // SECOND NUMBER SYSTEM DIGIT [5]: Encoded with left-hand odd parity, 0110001.
    // 1st MANUFACTURER DIGIT [0]: Encoding with left-hand even parity, 0100111.
    // 2nd MANUFACTURER DIGIT [1]: Encoded with left-hand odd parity, 0011001.
    // 3rd MANUFACTURER DIGIT [0]: Encoded with left-hand even parity, 0100111.
    // 4th MANUFACTURER DIGIT [3]: Encoded with left-hand odd parity, 0111101.
    // 5th MANUFACTURER DIGIT [1]: Encoded with left-hand even parity, 0110011.
    // CENTER GUARD BARS (always the same): 01010.
    // 1st PRODUCT CODE DIGIT [3]: Encoded as right-hand character, 1000010.
    // 2nd PRODUCT CODE DIGIT [1]: Encoded as right-hand character, 1100110.
    // 3rd PRODUCT CODE DIGIT [1]: Encoded as right-hand character, 1100110.
    // 4th PRODUCT CODE DIGIT [3]: Encoded as right-hand character, 1000010.
    // 5th PRODUCT CODE DIGIT [0]: Encoded as right-hand character, 1110010.
    // CHECK DIGIT [9]: Encoded as right-hand character, 1110100.
    // RIGHT GUARD BARS (always the same): 101.

    // example_bit_pattern =
    //     "101" +//left  sentinel
    //     "0110001" +
    //     "0100111" +
    //     "0011001" +
    //     "0100111" +
    //     "0111101" +
    //     "0110011" +
    //     "01010" + //center
    //     "1000010" +
    //     "1100110" +
    //     "1100110" +
    //     "1000010" +
    //     "1110010" +
    //     "1110100" +
    //     "101"; //right sentinel

    // test number : 111111111111
    // encoding: 1111111111116 [6 being the check digit]
    // See readme for a fuller breakdown of the numbers here
    
    example_bit_pattern =
    "101" + //left  sentinel
    "0011001"+ "0011001"+ "0110011"+ "0011001"+ "0110011"+ "0110011"+ //left encoded
    "01010"+ //center
    "1100110"+ "1100110"+ "1100110"+ "1100110"+ "1100110"+ //right encoded
    "1010000"+ //check digit (6)
    "101"//right sentinel
    
    // print(example_bit_pattern)
    // bits_to_bars(string_to_array(example_bit_pattern), width / 3, width / 3)
    // example_bit_pattern = string_to_array(example2());
}

function draw() {
    background(55);
    // 101 | <42 digits> | 01010 |  <42 digits> | 101
    // let example_array  = [101    01010 101];
    // bits_to_bars(string_to_array("101110111011"), width / 3, width / 3);


    // let example_pattern = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

    // background rectangle white, and above text

    info_text();
    generate_barcode(bar_location)
    bit_pattern = string_to_array(example_bit_pattern);
    background_rect(bar_location,bit_pattern);
    render_barcode(bit_pattern, bar_location, bar_spacing, bar_height);

//     popup(`Barcode Generator
// scan the barcode with phone
//  or
// print out this page then scan`,6);
}

let generate_barcode = (location)=>{
    // bit_pattern = string_to_array(example_bit_pattern);
    // background_rect(location,bit_pattern);
    // render_barcode(bit_pattern, location, bar_spacing, bar_height);
}
let background_rect = (_bar_location,bit_pattern) => {
    push();
    // rectMode(CORN);

    rect(
        _bar_location.x -10,
        _bar_location.y-10,
        bit_pattern.length * bar_spacing + 40 *barwidth,
        bar_height + 20
    );
    pop();
};
let info_text = () => {
    push();
    textSize(40);

    text("Barcode Generator By Oran", 100, 100);
    textAlign(CENTER);
    text("20200628", 350, 100 + 40 + 5);

    pop();
};
let example1 = () => {
    let left_bit_pattern = map_structure_to_bits("LGLGLG", `711253`);
    let right_bit_pattern = map_structure_to_bits("RRRRRR",`001202`);
    let full_bit_pattern =
        "101" + left_bit_pattern + "01010" + right_bit_pattern + "101";
        return full_bit_pattern

};

let example2 = () => {
    let left_bit_pattern = map_structure_to_bits("LLLLLL", `003994`);
    let right_bit_pattern = map_structure_to_bits("RRRRRR", `155486`);
    let full_bit_pattern =
        "101" + left_bit_pattern + "01010" + right_bit_pattern + "101";
    return full_bit_pattern
};

let demo_app = () => {
    let bit_pattern = map_structure_to_bits(
        "LLL",
        `${current}${current}${abs(current - 10)}`
    );
    bits_to_bars(bit_pattern, width / 3, width / 3);

    if (frameCount % 10 === 0) {
        current++;
        if (current >= 9) {
            current = 0;
        }
    }
};
//"1011100" -> [1, 0, 1, 1, 1, 0, 0]
let string_to_array = (binary_string) => {
    return binary_string.split("").map((x) => {
        return int(x);
    });
};

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
let render_barcode = (bit_pattern, bar_location, bar_spacing, bar_height) => {
    push();
    // noStroke();
    // strokeWeight(0)

    // rectMode(CENTER);
    //3 | 7 width x 6 times  | 5 | 7 width x 6 times | 3 
    for (var i = 0; i < bit_pattern.length; i += 1) {
        

        fill(map(bit_pattern[i], 0, 1, 255, 0));
        stroke(map(bit_pattern[i], 0, 1, 255, 0));
        strokeWeight(barwidth)
        strokeCap(SQUARE);


        // // var loc = 100;
        line(bar_location.x+i*barwidth, 100,
             bar_location.x+i*barwidth, 100 + 100 )
        rect(
            bar_location.x + bar_spacing * (i*barwidth) - 1,
            bar_location.y,
            bar_spacing*barwidth,
            bar_height
        );
    }
    strokeWeight(0)
    // rectMode(CORNER);
    // fill(color(0,255, 0,100));
    // rect(bar_location.x  - bar_spacing , bar_location.y , 10    , bar_height)

    // let flip = false
    // for (var i = 0; i < 40; i += 1) {
        
    //     if( i % 7 == 0){
            
    //         flip = !flip;
            
    //         // fill(0,255, 0,flip?100:0);
    //         fill(flip?color(0,255, 0,100):color(255,0, 255,50));

    //         rect(
    //             bar_location.x + bar_spacing * (i*barwidth)+12,
    //             bar_location.y + 50,
    //             bar_spacing*barwidth *7,
    //             bar_height
    //         );
    //    }
    // }

    // var i = 45;
    // fill(0,0,255,100);
    // rect(
    //     bar_location.x + bar_spacing * (i*barwidth)+3,
    //     bar_location.y + 50,
    //     bar_spacing*barwidth *7,
    //     bar_height
    // );


    // for (var i = 45; i < 40+45; i += 1) {
        
    //     if( i % 7 == 0){
            
    //         flip = !flip;
            
    //         fill(flip ? color(0,255, 0,100) : color(255,0, 255,50));
    //         rect(
    //             bar_location.x + bar_spacing * (i*barwidth)+9,
    //             bar_location.y + 50,
    //             bar_spacing*barwidth *7,
    //             bar_height
    //         );
    //    }
    // }

    pop();
};
