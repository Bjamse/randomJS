window.onload = boot;

let canvas; //variable for the canvas (not init yet)
let ctx;

function boot() {
    canvas = document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    ctx.lineWidth = "1";


    clear();
    animate();
}


function clear(){
    ctx.clearRect(0,0,100,140);
    for(let i =0; i < 10; i++){
        for(let j  =0; j< 14; j++){
            draw(i,j,false);
        }
    }
}


function draw(x,y, bool){
    ctx.beginPath();
    ctx.rect(x*10,y*10,10,10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    if(bool){
        ctx.lineWidth = pressed?"2":"1";
        ctx.strokeStyle = pressed? "red":"black";
        ctx.moveTo(x*10,y*10);
        ctx.lineTo(x*10+10,y*10+10);
    }else{
        ctx.lineWidth = "1";
        ctx.moveTo(x*10+10,y*10);
        ctx.lineTo(x*10,y*10+10);
    }
    ctx.stroke();
    ctx.strokeStyle = "black";
}


function drawNumber(n,m){
    console.log("tall:"+n+"     plass:"+m);
    let start;

    // draw offset per number
    switch(m){
        case 1:
            start = [1,1];
            break;
        case 2:
            start = [6,1];
            break;
        case 3:
            start = [1,8];
            break;
        case 4:
            start = [6,8];

    }

    for(let i = 0; i< 5; i++){
        for (let j = 0; j <3; j++){
            draw((j+start[0]),(i+start[1]),N[n][i][j])
        }
    }
}



let d;
let timer = 0;
let min = 0;
function animate() {
    requestAnimFrame( animate );
    d = new Date();
    if(d.getHours()!== timer || pressed){
        timer = d.getHours();
        drawNumber((Math.floor(timer/10)),1);
        drawNumber(timer%10,2);
    }
    if(d.getMinutes() !== min || pressed){
        min = d.getMinutes();
        drawNumber((Math.floor(min/10)),3);
        drawNumber(min%10,4);
    }

}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback,){
            window.setTimeout(callback, 1000 / 60);
        };
})();

let pressed = false;
document.onmousedown = function () {pressed = true};
document.onmouseup = function () {pressed = false;
    clear();
    drawNumber((Math.floor(timer/10)),1);
    drawNumber(timer%10,2);
    drawNumber((Math.floor(min/10)),3);
    drawNumber(min%10,4);

};