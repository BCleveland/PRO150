var app = new PIXI.Application({width:800, height:600, antialias: true, transparent:false, resolution:1});

app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

var shittyfuckinimage = PIXI.Sprite.fromImage("b84.png");

shittyfuckinimage.anchor.set(0.5);

shittyfuckinimage.x = app.screen.width /2;
shittyfuckinimage.y = app.screen.height / 2;

app.stage.addChild(shittyfuckinimage);

app.ticker.add(function(delta){
    shittyfuckinimage.rotation += 0.1 *delta;
});
