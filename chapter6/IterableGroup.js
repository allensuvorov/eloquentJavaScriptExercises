class Group {
    members = [];
    add(newMember){
        if (!this.members.includes(newMember)) {
            this.members.push(newMember);
        }
    }
    delete(memberToDelete){
        this.members = this.members.filter(member => member !== memberToDelete)
    }
    has(member){
        return this.members.includes(member);
    }
    static from(array){
        let newGroup = new Group;
        for (let item of array){
            newGroup.add(item);
        };
        return newGroup;
    }
}

class GroupIterator {
    constructor(group) {
        this.i = 0;
        this.group = group;
    }

    next() {
        if (this.i == this.group.members.length) return {done: true}
        let value = this.group.members[this.i]
        this.i++
        return {value, done: false}
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}
for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c

/* 

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};

TASK: If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

HINT: It is probably worthwhile to define a new class GroupIterator. Iterator instances should have a property that tracks the current position in the group. Every time next is called, it checks whether it is done and, if not, moves past the current value and returns it.

The Group class itself gets a method named by Symbol.iterator that, when called, returns a new instance of the iterator class for that group.*/