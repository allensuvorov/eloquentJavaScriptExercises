class Group {
    // constructor(){
    //     this.members = []; // why put it into constructor?
    // }
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
        return new Group;
    }
}

let group = new Group;
group.add(10);
group.add(10);
console.log(group.has(10));
group.delete(10);
console.log(group.has(10));

// let group = Group.from([10, 20]);
// console.log(group.has(10));
// // → true
// console.log(group.has(30));
// // → false
// group.add(10);
// group.delete(10);
// console.log(group.has(10));
// // → false