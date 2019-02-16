var socket = io();

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

let state;
let circle = new PIXI.Graphics;
let inputs = {
  left = false,
  right = false,
  up = false,
  down = false
}

circle.lineStyle(40, 0xFF0000);
circle.drawCircle(circle.x, circle.y, 20);
circle.endFill();

function setup(){
circle.vx = 0;
circle.vy = 0;
circle.x = innerWidth / 2;
circle.y = innerHeight/ 2;

app.stage.addChild(circle);

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
}

let upArrow = keyboard("ArrowUp"),
    leftArrow = keyboard("ArrowLeft"),
    downArrow = keyboard("ArrowDown"),
    rightArrow = keyboard("ArrowRight");

leftArrow.press = () => {
    circle.vx = -5;
    inputs.left = true;
}
leftArrow.release = () =>{
    if(!rightArrow.isDown){
        circle.vx = 0;
        inputs.left = false;
    }
}

upArrow.press = () => {
    circle.vy = -5;
    inputs.up = true;
};
upArrow.release = () => {
    if (!downArrow.isDown) {
      circle.vy = 0;
      inputs.up = false;
    }
};

  //Right
rightArrow.press = () => {
    circle.vx = 5;
    inputs.right = true;
};
rightArrow.release = () => {
    if (!leftArrow.isDown) {
      circle.vx = 0;
      inputs.right = false;
    }
};

  //Down
downArrow.press = () => {
    circle.vy = 5;
    inputs.down = true;
};
downArrow.release = () => {
    if (!upArrow.isDown) {
      circle.vy = 0;
      inputs.down = false;
    }
};

state = play;

app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta){
  socket.emit('input', inputs);
  state(delta);
}

function play(delta){
  circle.x += circle.vx;
  circle.y += circle.vy;
    
}

setup();