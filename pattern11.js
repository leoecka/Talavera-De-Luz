p5.disableFriendlyErrors = true;

let tileManager;
let tileSize = 50;
let azulejos = [];
let updatecheck = true;
let offset = 3;
let animationBuffer;



function preload() {
  azulejos = [
    { img: loadImage('Azulejo3_new.jpg'), dna: {type: "diagonal", angle: Math.PI / 4 , speed: 1, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false} },
    { img: loadImage('Azulejo1_new.jpg'), dna: {type: "diagonal_bricks", angle: Math.PI / 4, speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false} },
    { img: loadImage('Azulejo2.jpg'), dna: {type: "diagonal_space", angle: Math.PI / 4, speed: 2, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false} }
  ];
  ladrillo = loadImage('Ladrillo2_new.jpg');
}

function setup() {
  createCanvas(1920,1080);
  frameRate(60);
  tileManager = new TileManager();
  tileManager.start();
 }


function draw() {
  //clear();
  background(0);
  tileManager.generate();
  tileManager.draw();
  //image(grain, 0, 0);
  //console.log(frameRate());
}


function glow(glowColor, blurriness) {
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = blurriness;
}


