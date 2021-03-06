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
// argument - build a graph from an array of strings "from-to"
// the graph will have for each place a list of places with a direct road to them. 
function buildGraph(edges) {
    // create a clean object with no methods
    let graph = Object.create(null);
    // add function that will take the FROMs and TOs (with we extract later) 
    function addEdge(from, to) {
        // if this FROM is new for our graph
        if (graph[from] == null) {
            // create a pair with key = FROM and value - array with this TO - [to] 
            graph[from] = [to];
        } else {
            // else (meaning this FROM is already in the object) push this TO to the array of that FROM
            graph[from].push(to);
        }
    }
    // map function splits each road string by "-" into and array of smaller arrays contaning [from, to] 
    // iterate the main array of roads
    // deconstruct the FROM and TO and iterate both 
    for (let [from, to] of edges.map(r => r.split("-"))) {
        // add that [FROM, TO] pare to the graph
        addEdge(from, to);
        // add it the other way [to, from] as well, because it's possibe to travel that way also
        addEdge(to, from);
    }
    return graph; // object with {from: [to1, to2, to3]
}

const roadGraph = buildGraph(roads);

// console.log(roadGraph['Marketplace']);
// console.log(roadGraph);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        // check if there is a road from current to destination
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

// runs the robot with given state and memory
function runRobot(state, robot, memory) {
    // loop without condition and count turns
    for (let turn = 0;; turn++) {
        // if no more parcels do deliver
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            // break when parcels list is empty
            break; 
        }
        console.log(memory);
        // action points to an object returned by robot 
        // - {at: first place of the route, and memory: a list with the rest of the route}
        let action = robot(state, memory);
        // state is updated with move to destination
        state = state.move(action.direction);
        // memory is updated as well
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
    // console.table(parcels);
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
    // if memory is empty - push initial route in it
    if (memory.length == 0) {
        memory = mailRoute
    }
    // return object with {first place, and put the rest of routes to memory}
    return {direction: memory[0], memory: memory.slice(1)}; 
}   
// runRobot(VillageState.random(), routeRobot, []);
//#endregion

//#region Pathfinding

// passed: graph (object) with {from:to} pairs
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
// builds a route for given a starting point, and a set of parcels
function goalOrientedRobot({place, parcels}, route) {
    // if route is empty
    if (route.length == 0) {
        // let's work on the first parcel
        let parcel = parcels[0];
        // if that parcel's location is not starting point
        if (parcel.place != place) {
            // find route to that location
            route = findRoute(roadGraph, place, parcel.place);
            // if it is
        } else {
            // find route to the destination of the parcel
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    // return {first place of the route, and a list with the rest of the route}
    return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(), goalOrientedRobot, []);
//#endregion

//#region Exercise: Measuring a robot

function compareRobots(robot1, memory1, robot2, memory2){
    // declare counters for robot1 results and robot2 results
    let r1turns = 0;
    let r2turns = 0;
    
    // loop will generate tasks and feed them to robots
    for (let i = 0; i < 100; i++){
        let state = VillageState.random();
        task1 = state;
        task2 = state;
        // run robot1 -> r1turns + turn
        for (let turn = 0;; turn++){
            if (task1.parcels.length == 0) {
                r1turns += turn;
                break;
            }
            let action = robot1(task1, memory1);
            task1 = task1.move(action.direction);
            memory1 = action.memory;
        }

        // run robot2 -> r1turns + turn
        for (let turn = 0;; turn++){
            if (task2.parcels.length == 0) {
                r2turns += turn;
                break;
            }
            let action = robot2(task2, memory2);
            task2 = task2.move(action.direction);
            memory2 = action.memory;
        }
    }
    console.log("routeRobot result: ", r1turns/100, "goalOrientedRobot result: ", r2turns/100);
    
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);

//#endregion

//#region Robot efficiency


// Can you write a robot that finishes the delivery task faster than goalOrientedRobot?

function improvedRobot({place, parcels}, route) {

    // One possible solution would be to compute routes for all packages and then take the shortest one. Even better results can be obtained, if there are multiple shortest routes, by preferring the ones that go to pick up a package instead of delivering a package.
    // refreshing how the goalOrientedRobot works - 10 jan 2021

}
// compareRobots(goalOrientedRobot, [], improvedRobot, []);

//#endregion