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
    constructor(Group) {
        
    }
}
for (let value of Group.from(["a", "b", "c"]).members) {
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