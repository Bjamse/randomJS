
window.onload = boot;
let canvas; //variable for the canvas (not init yet)
let ctx; //canvas context variable (not init yet)

let g; //graph variable
let canvasSize = [];
function boot(){
    canvas = document.getElementById("board");// init canavas
    ctx = canvas.getContext("2d");//  init context for canvas

    g =new Graph(); // graph variable init
    g.addNodeAt(34,312);
    g.addNodeAt(213,768);
    g.addNodeAt(200,500);
    g.addNodeAt(500,600);

    g.nodes[0].addEdgeToNode(g.nodes[1]);
    animate();
    canvasSize= [
        document.getElementById("board").getBoundingClientRect().width,
        document.getElementById("board").getBoundingClientRect().height
    ]
}
//lag kant til musa
// switch (mode) {
//     case 1:
//         if (select0 !== null){
//             ctx.beginPath();
//             ctx.moveTo( )
//         }
//         break;
// }


let select0 = null;
let select1 = null;
function animate() {
    requestAnimFrame( animate );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    g.draw();

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


let mode = 0;
function clearMode(){
    document.getElementById("mod1").checked = false;
    document.getElementById("mod2").checked = false;
    document.getElementById("mod3").checked = false;
    select0 = null;
    select1 = null;
}
function getmode() {
    //gets mode of radiobuttons
    //returns value equal to which mode was clicked
    mode = 0;
    let r = document.getElementsByName("mode");
    for(let i in r){
        if(r[i].checked){
            mode= (Number(i)+1)
        }
    }
    // returns 0 if none where clicked
    return mode;

}