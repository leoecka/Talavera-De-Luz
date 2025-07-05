p5.disableFriendlyErrors = true;

let backgroundColor = 0;

let tileManager;
let tileSize = 50;
let azulejos = [];
let updatecheck = true;
let offset = 3;

//mapping
let pMapper;
let quadMap, triMap, lineMap, bezMap, polyMap;
let sel;
let mode;
let myFont;
let img;

let animationBuffer;

function preload() {
  azulejos = [
    { img: loadImage('Azulejo3_new.jpg'), dna: {type: "diagonal", angle: Math.PI / 4 , speed: 1, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false} },
    { img: loadImage('Azulejo1_new.jpg'), dna: {type: "diagonal_bricks", angle: Math.PI / 4, speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false} },
    { img: loadImage('Azulejo2.jpg'), dna: {type: "diagonal_space", angle: Math.PI / 4, speed: 2, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false} }
  ];
  ladrillo = loadImage('Ladrillo2_new.jpg');

  img = loadImage("mapping/assets/Screenshot (372).png");
  myFont = loadFont("mapping/assets/Roboto.ttf");
}

function setup() {
  
  
  //createCanvas(1920,1080);
  createCanvas(1920,1080, WEBGL);
  textFont(myFont);

  frameRate(60);
  tileManager = new TileManager();
  tileManager.start();
  tileManager2 = new TileManager();
  tileManager2.start();

  // create mapper object
  pMapper = createProjectionMapper(this);
  quadMap = pMapper.createQuadMap(width, height);
  pMapper.load("maps/map.json");

  }


function draw() {
  
  background(backgroundColor);
 

  tileManager.generate();
  tileManager.draw(); // zeichnet in tileManager.buffer
  
  textureMode(NORMAL);
  textureMode(NORMAL);
  imageMode(CORNER);  
  //quadMap.displayTexture(tileManager.buffer);
  
  quadMap.displayTexture(tileManager.buffer, 0, 0, width, height);
  }



function glow(glowColor, blurriness) {
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = blurriness;
}


//mapping

function keyPressed() {
  switch (key) {
    case "c":
      pMapper.toggleCalibration();
      break;
    case "f":
      let fs = fullscreen();
      fullscreen(!fs);
      break;
    case "l":
      pMapper.load("maps/map.json");
      break;
    case "s":
      pMapper.save("map.json");
      break;
  }
}

