// barcode generator

// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20200625

// NOTE:
// code for generating the bitpattern of the barcode 
// look at ./crc.js 

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

// Encoding pattern Structure of EAN-13
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

let example_bit_pattern;


let bar_height = 100; //barcode's hight
let bar_spacing = .7; //space between bars
let barwidth = 2; //width of bars

function setup() {
    createCanvas(800, 800);
    bar_location = createVector(width / 3, width / 3);
    noSmooth()

    example_bit_pattern = generate_bit_pattern("750103131130")

}

function draw() {
    background(55);
    info_text();
    bit_pattern = string_to_array(example_bit_pattern);
    background_rect(bar_location,bit_pattern);
    render_barcode(bit_pattern, bar_location, bar_spacing, bar_height);

    popup(`Barcode Generator
scan the barcode with phone
 or
print out this page then scan`,6);
}

// barcode rendering(show on screen)
// -------------------------

//  draw a white box behind the barcode
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



// Informational onscreen text
let info_text = () => {
    push();
    textSize(40);

    text("Barcode Generator By Oran", 100, 100);
    textAlign(CENTER);
    text("20200628", 350, 100 + 40 + 5);

    pop();
};

// actually render the barcode on screen
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
