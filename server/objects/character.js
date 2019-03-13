module.exports = class Character{
    constructor(schema){
        this.name = schema.Name;
        this.hp = 100 + (5*schema.HP);
        this.maxHp = this.hp;
        this.attack = schema.ATK;
        this.defence = schema.DEF;
        this.spDefence = schema.MDEF;
        this.speed = schema.SPD;
        this.moves = schema.Moves;
        this.imageUrl = schema.imageUrl;
        this.effectiveSpeed = schema.SPD;
    }
    dealDamage(damage){
        this.hp -= damage;
        console.log(this.name + " took " + damage + " damage and now has " + this.hp + "hp.");
    }
}