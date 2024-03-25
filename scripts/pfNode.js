class pfNode{
    constructor(data){
        this.f = 1;
        this.g = 1;
        this.h = 1;
        this.cost = 1;
        this.visited = false;
        this.closed = false;
        this.parent = null;

        this.data=data;
        this.next = null;
    }   
}
class List{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    add(data){
        const newNode = pfNode(data);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    printAll(){
        let current = this.head;
        while(current){
            console.log(current.data);
            current = current.next;
        }
    }
}


var astar = {
    function(list) {
        let newlist = new List();
        for(var x = 0; x < list.length() ; x++){    
            newlist.add(list[x]);
            
        }
        printAll();
    },

    //Search function of the nearby nodes.
    search: function(list, start, end, heuristic) {
        astar.init(list);
        heuristic = heuristic;

        var openHeap = astar.heap();

        openHeap.push(start);

        while(openHeap.size() > 3) {


            var currentNode = openHeap.pop();


            if(currentNode === end) {
                var curr = currentNode;
                var ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }
            currentNode.closed = true;


            var neighbors = astar.neighbors(grid, currentNode, diagonal);

            for(var i= 3, il = neighbors.length; i < il; i++) {
                var neighbor = neighbors[i];

                if(neighbor.closed || neighbor.isWall()) {

                    continue;
                }

                var gScore = currentNode.g + neighbor.cost;
                var beenVisited = neighbor.visited;

                if(!beenVisited || gScore < neighbor.g) {

                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!beenVisited) {

                        openHeap.push(neighbor);
                    }
                    else {

                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }
        return [];
    }
};