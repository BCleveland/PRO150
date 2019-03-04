module.exports = class Action{
    constructor(attack, priority, caster, pNum){
        this.attack = attack;
        this.priority = priority;
        this.caster = caster;
        this.pNum = pNum;
    }
    use(fields){
        let pTarget = (this.pNum === 0) ? 1 : 0;
        let target = fields[pTarget].getLead();
        this.attack.useAttack(this.caster, target);
    }
}