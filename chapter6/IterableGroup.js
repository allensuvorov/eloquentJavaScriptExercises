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

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c