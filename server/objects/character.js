module.exports = class Character{
    constructor(schema){
        this.name = schema.Name;
        this.hp = 100 + (5*schema.HP);
        this.attack = schema.ATK;
        this.defence = schema.DEF;
        this.spDefence = schema.MDEF;
        this.speed = schema.SPD;
        this.moves = schema.Moves;
        this.imageUrl = schema.imageUrl;
    }
    dealDamage(damage){
        this.hp -= damage;
        console.log(this.name + " took " + damage + " damage and now has " + this.hp + "hp.");
    }
}