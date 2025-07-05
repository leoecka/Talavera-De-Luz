p5.disableFriendlyErrors = true;

let backgroundColor = 0;

let tileManager;
let tileSize = 65;//35;
let tileSize2 = 100;//35;
let tileSize3 = 170;//35;
let azulejos = [];
let ladrillo = [];
let updatecheck = true;
let offset = 3;
let start = false;

//mapping
let pMapper;
let quadMap, triMap, lineMap, bezMap, polyMap;
let sel;
let mode;
let myFont;
let img;

let animationBuffer;

let guitarSamples = [];
//let guitarSamplesFiles = ['C_Gtr.wav', 'D_Gtr.wav', 'E_Gtr.wav', 'F_Gtr.wav', 'G_Gtr.wav', 'A_Gtr.wav', 'H_Gtr.wav', 'c2_Gtr.wav', 'd2_Gtr.wav', 'e2_Gtr.wav', 'f2_Gtr.wav', 'g2_Gtr.wav', 'a2_Gtr.wav', 'h2_Gtr.wav', 'c3_Gtr.wav']; // oder so viele wie du willst
let guitarSamplesFiles = ['vln1.wav', 'vln2.wav', 'vln3.wav', 'vln4.wav', 'vln5.wav', 'vln6.wav', 'vln7.wav', 'vln8.wav', 'vln9.wav', 'vln10.wav', 'vln11.wav', 'vln12.wav', 'vln13.wav', 'vln14.wav', 'vln15.wav', 'vln16.wav', 'vln17.wav', 'vln18.wav', 'vln19.wav', 'vln20.wav', 'vln21.wav', 'vln22.wav', 'vln23.wav', 'vln24.wav', 'vln25.wav', 'vln26.wav', 'vln27.wav', 'vln28.wav', 'vln29.wav'];
let reverb;
let masterGain, dryGain, wetGain;

/*
let GC = [];
let GC_Files = ['Tl gc modified Export 1 GC 1C Render 0.wav', 'Tl gc modified Export 1 GC 1CH Render 0.wav', 'Tl gc modified Export 1 GC 2C Render 0.wav', 'Tl gc modified Export 1 GC 2CH Render 0.wav', 'Tl gc modified Export 1 GC 3CH Render 0.wav', 'Tl gc modified Export 1 GC 3D Render 0.wav', 'Tl gc modified Export 1 GC 4CH Render 0.wav', 'Tl gc modified Export 1 GC 4D Render 0.wav', 'Tl gc modified Export 1 GC 5CH Render 0.wav', 'Tl gc modified Export 1 GC 5E Render 0.wav', 'Tl gc modified Export 1 GC 6CH Render 0.wav', 'Tl gc modified Export 1 GC 6F Render 0.wav', 'Tl gc modified Export 1 GC 7CH Render 0.wav', 'Tl gc modified Export 1 GC 7F Render 0.wav', 'Tl gc modified Export 1 GC 8CH Render 0.wav', 'Tl gc modified Export 1 GC 8G Render 0.wav', 'Tl gc modified Export 1 GC 9CH Render 0.wav', 'Tl gc modified Export 1 GC 9G Render 0.wav', 'Tl gc modified Export 1 GC 10A Render 0.wav', 'Tl gc modified Export 1 GC 10CH Render 0.wav', 'Tl gc modified Export 1 GC 11A Render 0.wav', 'Tl gc modified Export 1 GC 11CH Render 0.wav', 'Tl gc modified Export 1 GC 12 CH Render 0.wav', 'Tl gc modified Export 1 GC 12B Render 0.wav'];
let HM = [];
let HM_Files = ['TL Harp Modified Export 1 HM 1C Render 0.wav', 'TL Harp Modified Export 1 HM 1CH Render 0.wav', 'TL Harp Modified Export 1 HM 2C Render 0.wav', 'TL Harp Modified Export 1 HM 2CH Render 0.wav', 'TL Harp Modified Export 1 HM 3CH Render 0.wav', 'TL Harp Modified Export 1 HM 3D Render 0.wav', 'TL Harp Modified Export 1 HM 4CH Render 0.wav', 'TL Harp Modified Export 1 HM 4D Render 0.wav', 'TL Harp Modified Export 1 HM 5CH Render 0.wav', 'TL Harp Modified Export 1 HM 5E Render 0.wav', 'TL Harp Modified Export 1 HM 6CH Render 0.wav', 'TL Harp Modified Export 1 HM 6F Render 0.wav', 'TL Harp Modified Export 1 HM 7CH Render 0.wav', 'TL Harp Modified Export 1 HM 7F Render 0.wav', 'TL Harp Modified Export 1 HM 8CH Render 0.wav', 'TL Harp Modified Export 1 HM 8G Render 0.wav', 'TL Harp Modified Export 1 HM 9CH Render 0.wav', 'TL Harp Modified Export 1 HM 9G Render 0.wav', 'TL Harp Modified Export 1 HM 10A Render 0.wav', 'TL Harp Modified Export 1 HM 10CH Render 0.wav', 'TL Harp Modified Export 1 HM 11A Render 0.wav', 'TL Harp Modified Export 1 HM 11CH Render 0.wav', 'TL Harp Modified Export 1 HM 12B Render 0.wav', 'TL Harp Modified Export 1 HM 12CH Render 0.wav'];
let SS = [];
let SS_Files = ['TL SS Edit 1 Export 1 SS 1C Render 0.wav', 'TL SS Edit 1 Export 1 SS 1CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 2C Render 0.wav', 'TL SS Edit 1 Export 1 SS 2CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 3CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 3D Render 0.wav', 'TL SS Edit 1 Export 1 SS 4CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 4D Render 0.wav', 'TL SS Edit 1 Export 1 SS 5CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 5E Render 0.wav', 'TL SS Edit 1 Export 1 SS 6CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 6F Render 0.wav', 'TL SS Edit 1 Export 1 SS 7CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 7F Render 0.wav', 'TL SS Edit 1 Export 1 SS 8CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 8G Render 0.wav', 'TL SS Edit 1 Export 1 SS 9CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 9G Render 0.wav', 'TL SS Edit 1 Export 1 SS 10A Render 0.wav', 'TL SS Edit 1 Export 1 SS 10CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 11A Render 0.wav', 'TL SS Edit 1 Export 1 SS 11CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 12B Render 0.wav', 'TL SS Edit 1 Export 1 SS 12CH Render 0.wav'];
let TP = [];
let TP_Files = ['TL TP Edit 1 Export 1 TP 1C Render 0.wav', 'TL TP Edit 1 Export 1 TP 1CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 2C Render 0.wav', 'TL TP Edit 1 Export 1 TP 2CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 3CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 3D Render 0.wav', 'TL TP Edit 1 Export 1 TP 4CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 4D Render 0.wav', 'TL TP Edit 1 Export 1 TP 5CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 5E Render 0.wav', 'TL TP Edit 1 Export 1 TP 6CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 6F Render 0.wav', 'TL TP Edit 1 Export 1 TP 7CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 7F Render 0.wav', 'TL TP Edit 1 Export 1 TP 8CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 8G Render 0.wav', 'TL TP Edit 1 Export 1 TP 9CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 9G Render 0.wav', 'TL TP Edit 1 Export 1 TP 10A Render 0.wav', 'TL TP Edit 1 Export 1 TP 10CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 11A Render 0.wav', 'TL TP Edit 1 Export 1 TP 11CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 12B Render 0.wav', 'TL TP Edit 1 Export 1 TP 12CH Render 0.wav'];
*/

let GC = [];
let GC_Files = ['Tl gc modified Export 1 GC 1C Render 0.wav', 'Tl gc modified Export 1 GC 1CH Render 0.wav','Tl gc modified Export 1 GC 3CH Render 0.wav', 'Tl gc modified Export 1 GC 3D Render 0.wav', 'Tl gc modified Export 1 GC 5CH Render 0.wav', 'Tl gc modified Export 1 GC 5E Render 0.wav',  'Tl gc modified Export 1 GC 7CH Render 0.wav', 'Tl gc modified Export 1 GC 7F Render 0.wav',  'Tl gc modified Export 1 GC 9CH Render 0.wav', 'Tl gc modified Export 1 GC 9G Render 0.wav',  'Tl gc modified Export 1 GC 11A Render 0.wav', 'Tl gc modified Export 1 GC 11CH Render 0.wav', 'Tl gc modified Export 1 GC 12 CH Render 0.wav', 'Tl gc modified Export 1 GC 12B Render 0.wav'];
let HM = [];
let HM_Files = ['TL Harp Modified Export 1 HM 1C Render 0.wav', 'TL Harp Modified Export 1 HM 1CH Render 0.wav', 'TL Harp Modified Export 1 HM 3CH Render 0.wav', 'TL Harp Modified Export 1 HM 3D Render 0.wav',  'TL Harp Modified Export 1 HM 5CH Render 0.wav', 'TL Harp Modified Export 1 HM 5E Render 0.wav', 'TL Harp Modified Export 1 HM 6CH Render 0.wav', 'TL Harp Modified Export 1 HM 6F Render 0.wav', 'TL Harp Modified Export 1 HM 8CH Render 0.wav', 'TL Harp Modified Export 1 HM 8G Render 0.wav', 'TL Harp Modified Export 1 HM 10A Render 0.wav', 'TL Harp Modified Export 1 HM 10CH Render 0.wav',  'TL Harp Modified Export 1 HM 12B Render 0.wav', 'TL Harp Modified Export 1 HM 12CH Render 0.wav'];
let SS = [];
let SS_Files = ['TL SS Edit 1 Export 1 SS 1C Render 0.wav', 'TL SS Edit 1 Export 1 SS 1CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 3CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 3D Render 0.wav', 'TL SS Edit 1 Export 1 SS 5CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 5E Render 0.wav', 'TL SS Edit 1 Export 1 SS 6CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 6F Render 0.wav', 'TL SS Edit 1 Export 1 SS 8CH Render 0.wav', 'TL SS Edit 1 Export 1 SS 8G Render 0.wav',  'TL SS Edit 1 Export 1 SS 10A Render 0.wav', 'TL SS Edit 1 Export 1 SS 10CH Render 0.wav',  'TL SS Edit 1 Export 1 SS 12B Render 0.wav', 'TL SS Edit 1 Export 1 SS 12CH Render 0.wav'];
let TP = [];
let TP_Files = ['TL TP Edit 1 Export 1 TP 1C Render 0.wav', 'TL TP Edit 1 Export 1 TP 1CH Render 0.wav',  'TL TP Edit 1 Export 1 TP 3CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 3D Render 0.wav', 'TL TP Edit 1 Export 1 TP 5CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 5E Render 0.wav', 'TL TP Edit 1 Export 1 TP 6CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 6F Render 0.wav', 'TL TP Edit 1 Export 1 TP 8CH Render 0.wav', 'TL TP Edit 1 Export 1 TP 8G Render 0.wav',  'TL TP Edit 1 Export 1 TP 10A Render 0.wav', 'TL TP Edit 1 Export 1 TP 10CH Render 0.wav',  'TL TP Edit 1 Export 1 TP 12B Render 0.wav', 'TL TP Edit 1 Export 1 TP 12CH Render 0.wav'];


function preload() {
  azulejos = [
    
    //blue-white
    { img: loadImage('BUAP/Sánchez_Romero_Dulce_mosaico.jpg'), dna: {type: "waves_vertical", angle: Math.PI / 4 , speed: 2/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "guitar"} },
    //blue-white
    { img: loadImage('BUAP/Gutierrez_Andres_mosaico.jpg'), dna: {type: "waves_horizontal", angle: Math.PI / 4 , speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "guitar"} },
    //blue-white(orange)   
    { img: loadImage('BUAP/Flores_Jesus_azulejo.jpg'), dna: {type: "waves_simple_horizontal", angle: Math.PI / 4 , speed: 4/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "TP"} },
    //blue-white
    { img: loadImage('BUAP/Diseño sin título.jpg'), dna: {type: "waves_vertical", angle: Math.PI / 4 , speed: 5/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "HM"} },
    //blue/purple
    { img: loadImage('BUAP/Dionicio Secundino Carlos Eduardo.jpg'), dna: {type: "diagonal_space_2", angle: Math.PI / 4 , speed: 1, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "SS"} },
    //white blue (yellow)
    { img: loadImage('BUAP/Cory Alan Belmont Lopez_Mosaico.jpg'), dna: {type: "diagonal", angle: Math.PI / 4 , speed: 1, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "TP"} },
    //blue yellow
    { img: loadImage('BUAP/BeatrizGamboaCanales.jpg'), dna: {type: "diagonal_bricks", angle: Math.PI / 4, speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false, instrument: "HM"} },
    //yellow blue beige
    { img: loadImage('BUAP/Arrioja Gonzalez_Hector David_mosaico.jpg'), dna: {type: "diagonal_space", angle: Math.PI / 4, speed: 2, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false, instrument: "SS"} },
    

    //blue-white
    { img: loadImage('CEBIS/1.JPG'), dna: {type: "waves_vertical", angle: Math.PI / 4 , speed: 7/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "guitar"} },
    //blue-white
    { img: loadImage('CEBIS/2.JPG'), dna: {type: "waves_horizontal", angle: Math.PI / 4 , speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "guitar"} },
    //blue-white(orange)   
    
    { img: loadImage('CEBIS/3.JPG'), dna: {type: "waves_simple_horizontal", angle: Math.PI / 4 , speed: 4/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "TP"} },
    //blue-white
    { img: loadImage('CEBIS/4.JPG'), dna: {type: "waves_vertical", angle: Math.PI / 4 , speed: 5/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "HM"} },
    //blue/purple
    { img: loadImage('CEBIS/5.JPG'), dna: {type: "diagonal_space_2", angle: Math.PI / 4 , speed: 1, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "SS"} },
    //white blue (yellow)
    { img: loadImage('CEBIS/6.JPG'), dna: {type: "diagonal", angle: Math.PI / 4 , speed: 1, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "TP"} },
    //blue yellow
    { img: loadImage('CEBIS/7.JPG'), dna: {type: "diagonal_bricks", angle: Math.PI / 4, speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false, instrument: "HM"} },
    //yellow blue beige
    { img: loadImage('CEBIS/8.JPG'), dna: {type: "diagonal_space", angle: Math.PI / 4, speed: 2, alphaA: 255, ColorA: 255, alphaL: 255, ColorL:255, isLadrillo: false, instrument: "SS"} },
     //blue-white
    { img: loadImage('CEBIS/9.JPG'), dna: {type: "waves_vertical", angle: Math.PI / 4 , speed: 4/3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "guitar"} },
    //blue-white
    { img: loadImage('CEBIS/10.JPG'), dna: {type: "waves_horizontal", angle: Math.PI / 4 , speed: 3, alphaA: 255, ColorA: 255, alphaL: 255, ColorL: 255, isLadrillo: false, instrument: "guitar"} },
    
    ];

  ladrillo = [
  loadImage('Ladrillo3_new.jpg'),
  //blue white yellow
  loadImage('BUAP/Ortega_Jose_,mosaico_Mesa de trabajo 1.jpg'),
  //yellow orange blue
  loadImage('BUAP/CamScanner 19-03-2025 13.56_3.jpg'),
  //beige green
  
  loadImage('BUAP/Chantes_Diana_mosaico.jpg'),
  //white (blue red)
  loadImage('BUAP/Hernandez_Melanny_mosaico.jpg'),
  //purple yellow blue
  loadImage('BUAP/HernandezCastillo_Alexis_mosaico.jpg'),
  //green blue (purple)
  loadImage('BUAP/KatyaZayasCampos.jpg'),
  //white blue
  loadImage('BUAP/Leon_Katya_mosaico.jpeg'),
  //back purple
  loadImage('BUAP/Lugo_Diego_mosaico.jpg'),
  //orange beige
  loadImage('BUAP/Marin_Marisa_mosaico_225319.jpg'),
  //beige blue
  loadImage('BUAP/Michelle Monserrat Camacho Máximo.jpeg'),
  //white blue
  loadImage('BUAP/MOSAICO TALAVERA - VICTOR DIAZ RAMIREZ.jpg'),
  //white colored
  loadImage('BUAP/NOHELIA_GONZALEZ_SANTIAGO.jpg'),
  //white blue
  loadImage('BUAP/Olivares_Montes_Evelin_Johana_mosaico.jpg'),
  //white blue
  loadImage('BUAP/OrtizFlores_Beatriz_Mosaico.jpg'),
  //white blue
  loadImage('BUAP/Ramírez De la Rosa_Paula_Mosaico.jpg'),
  
  loadImage('CEBIS/11.JPG'),
  //white (blue red)
  loadImage('CEBIS/12.JPG'),
  //purple yellow blue
  loadImage('CEBIS/13.JPG'),
  //green blue (purple)
  loadImage('CEBIS/14.JPG'),
  //white blue
  loadImage('CEBIS/15.JPG'),
  //back purple
  loadImage('CEBIS/16.JPG'),
  //orange beige
  loadImage('CEBIS/17.JPG'),
  //beige blue
  loadImage('CEBIS/18.JPG'),
  //white blue
  loadImage('CEBIS/19.JPG'),
  //white colored
  loadImage('CEBIS/20.JPG'),


  ];

  img = loadImage("mapping/assets/Screenshot (372).png");
  myFont = loadFont("mapping/assets/Roboto.ttf");
/*
  for (let i = 0; i < guitarSamplesFiles.length; i++) {
    guitarSamples[i] = loadSound('Sound/guitar/' + guitarSamplesFiles[i]);
  };
*/

 for (let i = 0; i < guitarSamplesFiles.length; i++) {
    guitarSamples[i] = loadSound('Sound/Violin/' + guitarSamplesFiles[i]);
  };

  for (let i = 0; i <GC_Files.length; i++) {
    GC[i] = loadSound('Sound/GC/' + GC_Files[i]);
  };

  for (let i = 0; i <HM_Files.length; i++) {
    HM[i] = loadSound('Sound/HM/' + HM_Files[i]);
  };

  for (let i = 0; i <SS_Files.length; i++) {
    SS[i] = loadSound('Sound/SS/' + SS_Files[i]);
  };

  for (let i = 0; i <TP_Files.length; i++) {
    TP[i] = loadSound('Sound/TP/' + TP_Files[i]);
  };
  
}

function setup() {
  

  masterGain = new p5.Gain();
  masterGain.connect(); // Verbunden mit Audio-Ausgang, aber wird gleich umgebaut

  dryGain = new p5.Gain();  // Für das trockene Signal (ohne Effekt)
  wetGain = new p5.Gain();  // Für das nasse Signal (mit Reverb)

  // Trockener Signalweg: masterGain -> dryGain -> Audio-Ausgang
  masterGain.disconnect(); // MasterGain erst mal vom Ausgang trennen
  masterGain.connect(dryGain);
  dryGain.connect(); // dryGain zum Audio-Ausgang

  // Reverb erstellen
  reverb = new p5.Reverb();
  reverb.process(masterGain, 1, 2); // 4 Sekunden Delay, 2.5 Sekunden Decay
  reverb.connect(wetGain);

  // Nasser Signalweg: masterGain -> Reverb -> wetGain -> Audio-Ausgang
  masterGain.connect(reverb);
  
  wetGain.connect();

  // Dry/Wet initial einstellen (z.B. 70% Dry, 30% Wet)
  dryGain.amp(0.7);
  wetGain.amp(0.3);

  // Beispiel: Samples an masterGain anschließen
  for (let i = 0; i < guitarSamples.length; i++) {
    guitarSamples[i].disconnect();
    guitarSamples[i].connect(masterGain);
  }
  
  //createCanvas(800*2,600*2, WEBGL);
  //let fullWidth = window.screen.width;
  //let fullHeight = window.screen.height;
  //createCanvas(fullWidth, fullHeight);
  createCanvas(1920,1080, WEBGL);
  //createCanvas(1024,768);
  textFont(myFont);

  frameRate(60);
  tileManager = new TileManager(tileSize);
  tileManager.start();
  
  setTimeout(() => tileManager.start(), 200);  

  tileManager2 = new TileManager(tileSize2);
  tileManager2.start();

  setTimeout(() => tileManager2.start(), 200); 

 // tileManager3 = new TileManager(tileSize3);
 // tileManager3.start();

 // setTimeout(() => tileManager3.start(), 200); 

  // create mapper object
  pMapper = createProjectionMapper(this);
  quadMap = pMapper.createQuadMap(width, height);
  //quadMap = pMapper.createQuadMap(width/2, height);
  
  quadMap2 = pMapper.createQuadMap(width, height);

 // quadMap3 = pMapper.createQuadMap(width, height);

  //polyMap = pMapper.createPolyMap(8);
  
  pMapper.load("maps/map.json");

  blackBuffer = createGraphics(width, height);
  blackBuffer.background(0); 
  
  }


function draw() {
  
  background(backgroundColor);
 

  tileManager.generate();
  tileManager.draw(); // zeichnet in tileManager.buffer
  
 // tileManager2.generate();
 // tileManager2.draw();

 // tileManager3.generate();
 // tileManager3.draw();


  textureMode(NORMAL);
    
 
  //image(tileManager.buffer, 0, 30);
  //image(tileManager.animationBuffer, 0, 30);
  quadMap.displayTexture(tileManager.buffer, 0, 0, width, height);
  quadMap.displayTexture(tileManager.animationBuffer, 0, 0, width, height);

  //quadMap2.displayTexture(tileManager2.buffer, 0, 0, width, height);
  //quadMap2.displayTexture(tileManager2.animationBuffer, 0, 0, width, height);
  
 // quadMap3.displayTexture(tileManager3.buffer, 0, 0, width, height);
 // quadMap3.displayTexture(tileManager3.animationBuffer, 0, 0, width, height);
  

  //quadMap2.displayTexture(blackBuffer, 0-60, 0, width+50, height+5);

  //polyMap.displayTexture(tileManager.buffer);
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

/*
function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs); // Wechselt in den Vollbildmodus
}
*/