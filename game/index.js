

let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

var app = new PIXI.Application({width:800, height:600, antialias: true, transparent:false, resolution:1});

app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

// loader.add("http://media.ifunny.com/results/2018/02/08/hcrbkca84w.jpg").load(setup);

// function setup(){
//     let shittyfuckinimage = new Sprite(resources["http://media.ifunny.com/results/2018/02/08/hcrbkca84w.jpg"].texture);
// //    .fromImage("http://media.ifunny.com/results/2018/02/08/hcrbkca84w.jpg", true);

// }

let circle = new PIXI.Graphics;
circle.lineStyle(40, 0xFF0000);
circle.drawCircle(innerWidth / 2, innerHeight / 2, 20);
circle.endFill();
app.stage.addChild(circle);


const ticker = new PIXI.ticker.Ticker();
ticker.stop();
ticker.add((deltaTime) =>{
    circle.y += 5 * deltaTime;
});
ticker.start();