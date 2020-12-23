//#region The task
// Our project in this chapter is to build an automaton, a little program that performs a task in a virtual world. Our automaton will be a mail-delivery robot picking up and dropping off parcels.

const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        // console.log(from, "-", to)
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph; // object of pairs key = "from" and value = "to"
}

const roadGraph = buildGraph(roads);

console.log(roadGraph['Marketplace']);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        // check whether there is a road from current to destination
        if (!roadGraph[this.place].includes(destination)) {
            return this; // if no direct road return current
        // if there is a road
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address}; // set new place (moving)
            }).filter(p => p.place != p.address); // remove delivered
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

//#endregion

//#region Persistent data
let object = Object.freeze({value: 5});
object.value = 10;
// console.log(object.value);

// This is about complexity management again. When the objects in my system are fixed, stable things, I can consider operations on them in isolation—moving to Alice’s house from a given start state always produces the same new state. When objects change over time, that adds a whole new dimension of complexity to this kind of reasoning.
//#endregion

//#region Simulation

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break; // break when parcels list is empty
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}
//To put this sophisticated robot to work, we’ll first need a way to create a new state with some parcels.
// this function is returning new state with current place and a random array of parcels (point A and B)
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    console.table(parcels);
    return new VillageState("Post Office", parcels);
}

// runRobot(VillageState.random(), randomRobot);

//#endregion

//#region The mail truck’s route

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute
    } // if memory is empty - push initial route in it
    return {direction: memory[0], memory: memory.slice(1)}; // return object with {first place, and put the rest of routes to memory}
}
// runRobot(VillageState.random(), routeRobot, []);
//#endregion

//#region Pathfinding

// passed: graph object with {from:to} pairs
function findRoute(graph, from, to) { 
    // array of objects (visits history + visits plan)
    // objects with: "from" place and route
    let work = [{at: from, route: []}]; 
    
    // go till lengh of work array
    for (let i = 0; i < work.length; i++) { 
        // put the i-object from work array to pair of "at" and "route" 
        let {at, route} = work[i]; 
        
        //iterate all destinations with direct road from the current place in graph
        // graph[at] returns an array of values for that key
        for (let place of graph[at]){ 
            // if destination equals point B than return array of places plus that finishing one
            if (place == to) return route.concat(place);
            // if where we need to go is non of any origins in the visits (we have not visited it)
            if (!work.some(w => w.at == place)) 
            {
                // add a visit object (save place and add it to the route)
                work.push({at:place, route: route.concat(place)});
            }
        }
    }
}


// Therefore, the function keeps a work list. This is an array of places that should be explored next, along with the route that got us there. It starts with just the start position and an empty route.

//#endregion