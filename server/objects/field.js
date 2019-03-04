module.exports = class Field{
    constructor(chars, ownerUsername){
        this.chars = chars;
        this.leadIndex = 0;
        this.ownerUsername = ownerUsername;
    }
    getLead(){
        return this.chars[this.leadIndex];
    }
    rotate(dir){
        this.leadIndex += dir;
        this.leadIndex %= chars.length;
    }
}