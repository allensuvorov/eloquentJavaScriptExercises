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
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
//#endregion
//#region 6.7. Maps
