let indexN = 0;
class Node{
    constructor(x,y){
        this.id = ++indexN;
        this.x = x;
        this.y = y;
        this.edges = [];
    }
    addEdgeToNode(x){
        let newEdge = new Edge(this, x);
        this.edges.push(newEdge);
        x.edges.push(newEdge);

    }
    removeParallelEdge(){
        let toDelete = [];
        for(let i = 0; i < this.edges.length; i++){
            for(let j= i+1; j < this.edges.length; j++){
                if(this.edges[j] === null || this.edges[i] === null){
                    continue;
                }
                if(this.edges[i].otherNodeto(this) === this.edges[j].otherNodeto(this)){
                    toDelete.push(j);
                }
            }
        }
        for(let i = 0; i < toDelete.length; i++){
            this.edges[toDelete[i]].remove();
        }
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "green";
        ctx.fill();
    }
}

let indexE = 0;
class Edge {
    constructor(A, B, weight){
        this.id = ++indexE;
        this.nodeA = A;
        this.nodeB = B;
        this.weight = weight;
    }
    hasnode(x){
        return this.nodeA === x || this.nodeB === x;
    }
    otherNodeto(x) { //returns the opposite node to x if x is a node to this edge
        try {
            if (x === this.nodeA) {
                return this.nodeB
            } else if (x === this.nodeB){
                return this.nodeA
            }
        }
        catch (e) {
            alert("error in "+ this.id+ " edge, not assisiated with node "+ x.id +"\n\n Error = "+e);
        }

    }
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.nodeA.x, this.nodeA.y);
        ctx.lineTo(this.nodeB.x, this.nodeB.y);
        ctx.stroke();
    }
    remove(){
        for(let i = 0; i < this.nodeA.edges.length; i++){
            if(this.nodeA.edges[i].id === this.id){
                this.nodeA.edges.splice(i, 1);
                break;
            }
        }
        for(let i = 0; i < this.nodeB.edges.length; i++){
            if(this.nodeB.edges[i].id === this.id){
                this.nodeB.edges.splice(i, 1);
                break;
            }
        }
    }
}
class Graph{
    constructor(){
        this.nodes = []
    }
    drawNodes(){
        for(let i = 0; i < this.nodes.length; i++){
            this.nodes[i].draw();
        }
    }
    addNodeAt(x,y){
        this.nodes.push(new Node(x,y))
    }
    drawEdges(){ //printer alle kanter til skjermen hvis noden det  blir kllt fra er hoved noden.
        for(let i = 0; i < this.nodes.length; i++){
            for(let j = 0; j < this.nodes[i].edges.length; j++){
                if(this.nodes[i] === this.nodes[i].edges[j].nodeA){
                    this.nodes[i].edges[j].draw();
                }

            }
        }
    }

    draw(){
        this.drawEdges();
        this.drawNodes();
    }
}


