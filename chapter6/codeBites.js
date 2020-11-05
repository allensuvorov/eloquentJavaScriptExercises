// The chapter is very hm... interesting, need to review again.
// Format: Section Name + Sample Code

// 6.1. Encapsulation
// interfaces, public, private
// It is also common to put an underscore (_) 
// character at the start of property names to 
// indicate that those properties are private.

// no code here, because we don't want to

// 6.2. Methods

// cat says meow
// let cat = {};
// cat.speaks = function() {
//     console.log(`Cat says Meow`);
// };
// cat.speaks();

// 6.3. Prototypes

// console.log(Object.getPrototypeOf({}) ==
            // Object.prototype);
// → true
// console.log(Object.getPrototypeOf(Object.prototype)); 
// → null

// 6.4. Classes - do later
// 6.5. Class notation
// omitting class name - something peculiar, but not sure where to use it
let object = new class { 
    getWord() { 
        return "hello"; 
    } 
};
console.log(object.getWord());
// → hello

// 6.6. Overriding derived properties

