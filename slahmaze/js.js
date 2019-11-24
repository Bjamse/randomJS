window.onload = boot;

let canvas; //variable for the canvas (not init yet)
let ctx;

function boot() {
    canvas = document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    ctx.lineWidth = "1";


    for(let i =0; i < 10; i++){
        for(let j  =0; j< 10; j++){
            draw(i,j);
        }
    }

     animate();
}

function animate() {
    draw(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
    requestAnimFrame( animate );

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

function draw(x,y){
    ctx.beginPath();
    ctx.rect(x*10,y*10,10,10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    if(Math.floor(Math.random()*2)){
        ctx.moveTo(x*10,y*10);
        ctx.lineTo(x*10+10,y*10+10);
    }else{
        ctx.moveTo(x*10+10,y*10);
        ctx.lineTo(x*10,y*10+10);
    }
    ctx.stroke();
}