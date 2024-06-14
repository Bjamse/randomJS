let canvans;
let ctx;
let curve;
let width, height;

width = height = 800;

let colors = [];
let iterator = 0;
let running = false;
let useAlternativeDelayForSmallCurves = false;
let alternativeSpeed = 60; // ms delay
let colorSwitchOff = true;
function boot() {
    canvas = document.getElementById('canvas');

    ctx = canvas.getContext('2d');
    curve = hilbert(3, 0, 0, width, height, 0, false).flat(Infinity);
    ctx.lineWidth = 10;

    ctx.lineCap ="square";


    draw();

}
function generateColorGradient(n) {
    let colors = [];
    for (let i = 0; i < n; i++) {
        let hue = i * (360 / n);
        colors.push(`hsl(${hue}, 100%, 50%)`);
    }
    return colors;


}

function draw(){
    clear();
    ctx.lineWidth = 10;

    colors = generateColorGradient(curve.length);

    for (let i = 0; i < curve.length - 1; i++) {
        ctx.beginPath();
        ctx.strokeStyle = colorSwitchOff? "black" : colors[i];
        ctx.moveTo(curve[i].x, curve[i].y);
        ctx.lineTo(curve[(i + 1) % curve.length].x, curve[(i + 1) % curve.length].y);
        // console.log("--------")
        // console.log(curve[i]);
        // console.log(curve[(i + 1) % curve.length]);
        ctx.stroke();

    }





}
function clear() {
    ctx.clearRect(0, 0, height, width);

    ctx.beginPath();

}
function startAnimation(){
    running = !running;

    if(!running){return}
    FPS = curve.length / 3;

    iterator= 0;

    colors = generateColorGradient(curve.length);

    useAlternativeDelayForSmallCurves = curve.length < 200;





    alternativeSpeed = curve.length < 10? 400: 100;
    setTimeout(()=> {clear();update();},400 );

}
function update() {
    if (!running){ return;}
    if(curve.length-iterator <= 1 ){running = !running; return;}
    ctx.beginPath();

    ctx.strokeStyle = colorSwitchOff? "black" : colors[iterator];
    ctx.lineCap ="square";
    ctx.moveTo(curve[iterator].x, curve[iterator].y);
    ctx.lineTo(curve[iterator+1].x, curve[iterator+1].y);
    ctx.stroke();

    iterator += 1;
    if (useAlternativeDelayForSmallCurves) {
        setTimeout(update, alternativeSpeed);
    }else{
        requestAnimationFrame(update);
    }
}




/**
 * @param depth : int
 * @param off_x : float
 * @param off_y : float
 * @param wx    : float
 * @param hy    : float
 * @param rot   : int
 * @param reverse : boolean
 * @returns {*[]}
 */
function hilbert(depth, off_x, off_y, wx, hy, rot, reverse) {
    let res = [];
    if (depth > 0) {
        wx = wx / 2;
        hy = hy / 2;


        switch (rot % 4) {
            case 0:
                res.push(hilbert(depth - 1, off_x, off_y + hy, wx, hy, 1, true),
                    hilbert(depth - 1, off_x, off_y, wx, hy, 0, false) ,
                    hilbert(depth - 1, off_x + wx, off_y, wx, hy, 0, false),
                    hilbert(depth - 1, off_x + wx, off_y + hy, wx, hy, 3, true));
                break;
            case 1:
                res.push( hilbert(depth - 1, off_x, off_y, wx, hy, 2, false) ,
                    hilbert(depth - 1, off_x + wx, off_y, wx, hy, 1, true) ,
                    hilbert(depth - 1, off_x + wx, off_y + hy, wx, hy, 1, true) ,
                    hilbert(depth - 1, off_x, off_y + hy, wx, hy, 0, false));
                break;
            case 2:
                res.push( hilbert(depth - 1, off_x + wx, off_y, wx, hy, 3, true) ,
                    hilbert(depth - 1, off_x + wx, off_y + hy, wx, hy, 2, false) ,
                    hilbert(depth - 1, off_x, off_y + hy, wx, hy, 2, false) ,
                    hilbert(depth - 1, off_x, off_y, wx, hy, 1, true));
                break;
            case 3:
                res.push( hilbert(depth - 1, off_x + wx, off_y + hy, wx, hy, 0, false) ,
                    hilbert(depth - 1, off_x, off_y + hy, wx, hy, 3, true) ,
                    hilbert(depth - 1, off_x, off_y, wx, hy, 3, true) ,
                    hilbert(depth - 1, off_x + wx, off_y, wx, hy, 2, false));
                break;
        }
    } else {

        //define grid pos in the given small area

        let gx = (wx / 2) / 2; //grid x
        let gy = (hy / 2) / 2; //grid y

        let n1 = new Node(off_x + gx, off_y + gy);
        let n2 = new Node(off_x + gx * 3, off_y + gy);
        let n3 = new Node(off_x + gx, off_y + gy * 3);
        let n4 = new Node(off_x + gx * 3, off_y + gy * 3);


        //clockwise rotations
        switch (rot % 4) {
            case 0:
                res = [n3, n1, n2, n4];
                break;
            case 1:
                res = [n1, n2, n4, n3];
                break;
            case 2:
                res = [n2, n4, n3, n1];
                break;
            case 3:
                res = [n4, n3, n1, n2];
                break;
        }

    }
    if (reverse) {
        res.reverse();
    }

    return res;
}


//0:     n
//b, c
//a, d
// 3 1 2 4

//1:    >
// a, b
// d, c
// 1 2 4 3

//2:   u
// d, a
// c, b
// 2 4 3 1

//3: <
// c, d
// b, a
// 4 3 1 2


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


window.addEventListener('DOMContentLoaded', boot);