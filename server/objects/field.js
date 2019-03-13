module.exports = class Field{
    constructor(chars, ownerUsername){
        this.chars = chars;
        this.leadIndex = 0;
        this.ownerUsername = ownerUsername;
    }
    getLead(){
        console.log("LEAD IS " + this.chars[this.leadInex]);
        return this.chars[this.leadIndex];
    }
    rotate(dir){
        console.log("LEAD INDEX IS " + this.leadIndex);
        this.leadIndex += dir;
        this.leadIndex %= this.chars.length;
        if(this.leadIndex < 0){
            this.leadIndex = this.chars.length + this.leadIndex;
        }
        console.log("LEAD INDEX NOW HAS BEEN " + this.leadIndex);
    }
}