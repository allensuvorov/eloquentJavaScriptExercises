// here we are building a class Unit to illustrate 
// classes, encapsulation, constructor, getters and setters, instanseof

class Unit {

    _attack = 5;
    _health = 10;
  
    constructor(name) {
      this._name = name;   
    }
  
    get name() {
      return this._name;
    }
  
    set name (name) {
      this._name = name;
    }
  
    get health() {
      return this._health;
    }
  
    set health (health) {
      this._health = health;
    }
   
    set attack (attack) {
      if (attack < 5) {
        throw new Error ("Attack must be 5 of more");
      };
      this._attack = attack;
    }
  
    get attack () {
      return this._attack;
    }
  
    isAlive() {
      return this._health > 0;
    }
  
  
    attackOther(otherUnit) {
      if (!(otherUnit instanceof Unit)) {
        throw new Error("You can not attack this")
      }
  
      if (!this.isAlive()) {
        console.log("This unit is dead");
        return;
      }
  
      if (!otherUnit.isAlive()) {
        console.log("Other unit is dead");
        return;
      }
      otherUnit.health -= this._attack;
      console.log(`${this._name} attack ${otherUnit.name} ` )
  
    }
  
  };
  
  let tankUnit1 = new Unit("Ben");
  
  console.log(tankUnit1._name); // not allowed
  console.log(tankUnit1._health); // not allowed
  console.log(tankUnit1);
  console.log(tankUnit1.getHealth); // allowed
  tankUnit1.health = 15;
  console.log(tankUnit1.getHealth); // allowed
  // tankUnit1.attack = 3;
  
  let tankUnit2 = new Unit("John");
  tankUnit1.attackOther(tankUnit2);
  
  