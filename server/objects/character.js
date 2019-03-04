module.exports = class Character{
    constructor(name, hp){
        this.name = name;
        this.hp = hp;
        this.spDefence = 50;
        this.defence = 50;
        this.attack = 50;
    }
    dealDamage(damage){
        this.hp -= damage;
        console.log(this.name + " took " + damage + " damage and now has " + this.hp + "hp.");
    }
}