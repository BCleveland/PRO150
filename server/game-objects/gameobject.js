module.exports = class GameObject{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    getVisual(){
        var output = {
            x:this.x,
            y:this.y,
            radius:this.radius,
            color:this.color
        };
        return output;
    }
}