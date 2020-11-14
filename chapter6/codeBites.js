// The chapter is very hm... interesting, need to review again.
// Format: Section Name + Sample Code

//#region 6.1. Encapsulation
    // interfaces, public, private
    // It is also common to put an underscore (_) 
    // character at the start of property names to 
    // indicate that those properties are private.

// no code here, because we don't want to

    // New! Class properties are public by default and can be examined or 
    // modified outside the class. There is however an experimental 
    // proposal to allow defining private class fields using a hash # prefix.

class ClassWithPrivateField {
    #privateField = 10;
    #privateFieldUnused;
    publicField = 20;
    publicFieldUnused;
    _privateByConventionField;
    get privateField() {
        return this.#privateField;
    } 
}
let objectWithPrivateField = new ClassWithPrivateField ();

// console.log(objectWithPrivateField.privateField); // testing private field
// console.log(objectWithPrivateField.publicField);

class ClassWithPrivateMethod { 
    #privateMethod() { 
        return 'hello world'
    }
}

class ClassWithPrivateStaticField {
    static #PRIVATE_STATIC_FIELD
}
//#endregion
//#region 6.2. Methods

// cat says meow
let cat = {};
cat.speaks = function() {
    console.log(`Cat says Meow`);
};
// cat.speaks();
//#endregion
//#region 6.3. Prototypes

// console.log(Object.getPrototypeOf({}) ==
            // Object.prototype);
// → true
// console.log(Object.getPrototypeOf(Object.prototype)); 
// → null
//#endregion
// 6.4. Classes - // todo
//#region 6.5. Class notation
class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

// omitting class name - something peculiar, but not sure where to use it
let object = new class { 
    getWord() { 
        return "hello"; 
    } 
};
// console.log(object.getWord()); 
// → hello
//#endregion
//#region 6.6. Overriding derived properties

// Rabbit.prototype.teeth = "small";
// console.log(killerRabbit.teeth);
// // → small
// killerRabbit.teeth = "long, sharp, and bloody";
// console.log(killerRabbit.teeth);
// // → long, sharp, and bloody
// console.log(blackRabbit.teeth);
// // → small
// console.log(Rabbit.prototype.teeth);
// // → small

//#endregion
//#region 6.7. Maps

// If you pass null to Object.create, 
// the resulting object will not derive from Object.prototype 
// and can safely be used as a map.
// console.log("toString" in Object.create(null));
// → false

let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);
ages.set("Allen", 39);

// console.log(`Júlia is ${ages.get("Júlia")}`);
// // → Júlia is 62
// console.log("Is Jack's age known?", ages.has("Jack"));
// // → Is Jack's age known? false
// console.log(ages.has("toString"));
// // → false

// get keys just of this object, not of it's prototype 
// console.log(Object.keys({x:1})); 

//#endregion
//#region 6.8. Polymorphism

Rabbit.prototype.toString = function() { // assigning a new function for the method 
    return `a ${this.type} rabbit`;
};

// console.log(String(blackRabbit)); // String() constructor
//#endregion
//#region 6.9 Symbols
/* When I claimed that property names are strings, that wasn’t entirely accurate. 
They usually are, but they can also be symbols. 
Symbols are values created with the Symbol function. 
Unlike strings, newly created symbols are unique—
you cannot create the same symbol twice.*/

let sym = Symbol("name"); // create unique symbol sym
// console.log(sym == Symbol("name")); // can't recreate it
let symCopy = sym; // can copy it
// console.log(symCopy == sym); 
Rabbit.prototype[sym] = 55; // and can use it as a propetry name
// console.log(blackRabbit[sym]); // -> 55
// console.log(sym); // -> Symbol(name)

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function () {
    return `${this.length} cm of blue yarn`
}
console.log([1,2].toString());
console.log([1,2][toStringSymbol]());

let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope
  
//#endregion
//#region 6.10. The iterator interface
/* The object given to a for/of loop is expected to be iterable. This means it has a method named with the Symbol.iterator symbol (a symbol value defined by the language, stored as a property of the Symbol function).*/

//#endregion
