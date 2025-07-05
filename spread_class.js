class SpreadManager {
    constructor(tileSize) {
      this.tileSize = tileSize;
    }
  
    getNextTiles(tile) {
      if (tile.type === "diagonal") {
        return this.diagonalSpread(tile);
      } else if (tile.type === "diagonal_bricks") {
        return this.diagonalBrickSpread(tile);
      } else if (tile.type === "diagonal_space") {
        return this.diagonal_space_Spread(tile);
      } else if (tile.type === "diagonal_space_2") {
        return this.diagonal_space_Spread2(tile);
      } else if (tile.type === "waves_vertical") {
        return this.waves_vertical(tile);
      } else if (tile.type === "waves_simple_horizontal") {
        return this.waves_simple_horizontal(tile);
      } else if (tile.type === "waves_horizontal") {
        return this.waves_horizontal(tile);
      }
      return [];
    }
  
    diagonalSpread(tile) {
      let results = [];
      let d = this.tileSize / sqrt(2);
      let baseAngle = tile.angle;
      let color = 200 + random(0,55);
      let nalpha = 0;
  
      for (let i = 0; i < 4; i++) {
        let a = baseAngle + PI/4 + i * HALF_PI;
        let nx = tile.x + cos(a) * d * 2;
        let ny = tile.y + sin(a) * d * 2;
        let randomAngle = [1,3,5,7];
        let azulejo = {
          img: tile.img,
          dna: {
          type: tile.type,
          angle: QUARTER_PI * randomAngle[floor(random(4))],
          isLadrillo: false,          
          ColorL: color,
          alphaA: nalpha,
          speed: tile.speed,
          instrument: tile.instrument
          }
        }
        let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
        results.push(newTile);
      }
  
      // Plus Ladrillos
      for (let i = 0; i < 4; i++) {
        let a = baseAngle + i * HALF_PI;
        let bx = tile.x + cos(a) * tile.xSize;
        let by = tile.y + sin(a) * tile.ySize;
        let randomAngle = [1,3,5,7];
        let ladrill = {
          img: tile.ldrimg,
          dna:{
          type: tile.type,
          angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
          isLadrillo: true,
          ColorL: color,
          alphaA: nalpha,
          speed: tile.speed,
          instrument: tile.instrument
          }
        }
        let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
        results.push(newTile);
      }
  
      return results;
    }
  
      diagonalBrickSpread(tile) {
        let results = [];
        let d = this.tileSize / sqrt(2);
        let baseAngle = QUARTER_PI;
        let color = tile.ColorL;
        let nalpha = 0;
      
        // Diagonal Bricks
        for (let i = 0; i < 4; i++) {
          let a = baseAngle + PI / 4 + i * HALF_PI;
          let nx, ny;
      
          if (i % 2 === 0) {
            nx = tile.x + cos(a) * d * 2;
            ny = tile.y + sin(a) * d * 2;
          } else {
            nx = tile.x + cos(a) * d * 3;
            ny = tile.y + d;
          }
      
          let azulejo = {
            img: tile.img,
            dna: {
              type: tile.type,
              angle: tile.angle,
              isLadrillo: false,
              ColorL: 200 + random(55),
              alphaA: nalpha,
              speed: tile.speed,
              instrument: tile.instrument
            }
          };
          let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg);
          results.push(newTile);
        }
      
        // Ladrillos entlang der Achsen
        for (let i = 0; i < 4; i++) {
          let a = baseAngle + i * HALF_PI;
          let bx = tile.x + cos(a) * tile.xSize;
          let by = tile.y + sin(a) * tile.ySize;
          let randomAngle = [1,3,5,7];
      
          let ladrill = {
            img: tile.ldrimg, // globales Bild
            dna: {
              type: tile.type,
              angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
              isLadrillo: true,
              ColorL: 200 + random(55),
              alphaA: nalpha, // fester Wert wie im Original
              speed: tile.speed,
              instrument: tile.instrument
            }
          };
          let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg);
          results.push(newTile);
        }
      
        return results;
      }
  
  
  squareSpread(tile) {
    let results = [];
    let d = this.tileSize / sqrt(2);
    let d2 = d*2;
    let baseAngle = tile.angle;
    let color = 200 + random(10,55);
    let nalpha = 0;
    let xSize = this.tileSize/1.5;
    let ySize = this.tileSize/1.5;

    for (let i = 0; i < 4; i++) {
      let a = baseAngle + PI/4 + i * HALF_PI;
      let nx = tile.x + cos(a) * d * 2;
      let ny = tile.y + sin(a) * d * 2;
      let randomAngle = [1,3,5,7];
      let azulejo = {
        img: tile.img,
        dna: {
        type: tile.type,
        angle: QUARTER_PI * randomAngle[floor(random(4))],
        isLadrillo: false,          
        ColorL: color,
        alphaA: nalpha,
        speed: tile.speed,
        instrument: tile.instrument
        }
      }
      let newTile = new Tile(nx, ny, xSize, ySize, azulejo, tile.ldrimg )
      results.push(newTile);
    }

    // Plus Ladrillos
    for (let i = 0; i < 4; i++) {
      let a = baseAngle + i * HALF_PI;
      let bx = tile.x + cos(a) * this.tileSize;
      let by = tile.y + sin(a) * this.tileSize;
      let randomAngle = [0,2,4,6];
      let ladrill = {
        img: tile.ldrimg,
        dna:{
        type: tile.type,
        angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
        isLadrillo: true,
        ColorL: color,
        alphaA: nalpha,
        speed: tile.speed,
        instrument: tile.instrument
        }
      }
      let newTile = new Tile(bx, by, d2, d2, ladrill, tile.ldrimg )
      results.push(newTile);
    }

    return results;
  }



diagonal_space_Spread(tile) {
  let results = [];
  let d = this.tileSize / sqrt(2);
  let baseAngle = tile.angle;
  let color = 200 + random(0,55);
  let nalpha = 0;

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + PI/4 + i * HALF_PI;
    let nx = tile.x + cos(a) * d * 6;
    let ny = tile.y + sin(a) * d * 6;
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: false,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + i * HALF_PI;
    let nx = tile.x + cos(a) * tile.xSize*3;
    let ny = tile.y + sin(a) * tile.ySize*3;
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      //img: azulejos[1].img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: false,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }

  // Plus Ladrillos
  for (let j = 1; j < 3; j++){
    for (let i = 0; i < 4; i++) {
    
    let a = baseAngle + i * HALF_PI;
    let bx = tile.x + cos(a) * tile.xSize * j;
    let by = tile.y + sin(a) * tile.ySize * j;
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
    results.push(newTile);
  }
  }

  for (let j = 1; j < 3; j++){
    for (let i = 0; i < 4; i++) {
    
    let a = baseAngle + PI/4 + i * HALF_PI;
    let bx = tile.x + cos(a) * d * 2 * j;
    let by = tile.y + sin(a) * d * 2 * j;
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
    results.push(newTile);
  }
  }
  return results;
}


diagonal_space_Spread2(tile) {
  let results = [];
  let d = this.tileSize / sqrt(2);
  let baseAngle = tile.angle;
  let color = 200 + random(0,55);
  let nalpha = 0;

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + PI/4 + i * HALF_PI;
    let nx = tile.x + cos(a) * d * 4;
    let ny = tile.y + sin(a) * d * 4;
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: false,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + i * HALF_PI;
    let nx = tile.x + cos(a) * tile.xSize*2;
    let ny = tile.y + sin(a) * tile.ySize*2;
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      //img: azulejos[1].img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: false,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }

  // Plus Ladrillos
  
    for (let i = 0; i < 4; i++) {
    
    let a = baseAngle + i * HALF_PI;
    let bx = tile.x + cos(a) * tile.xSize;
    let by = tile.y + sin(a) * tile.ySize;
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
    results.push(newTile);
  }
  


    for (let i = 0; i < 4; i++) {
    
    let a = baseAngle + PI/4 + i * HALF_PI;
    let bx = tile.x + cos(a) * d * 2;
    let by = tile.y + sin(a) * d * 2;
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
    results.push(newTile);
  }
  
  return results;
}

waves_vertical(tile) {
  let results = [];
  let d = this.tileSize / sqrt(2);
  let baseAngle = tile.angle;
  let color = 200 + random(0,55);
  let nalpha = 0;

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + PI/4 + i * HALF_PI;
    let bool = false;
    let nx = tile.x + cos(a) * d * 4;
    let ny = tile.y + sin(a) * d * 4;
    if (i == 1 || i == 3){
      ny = tile.y + cos(a) * d * 2;
      bool = false;
    }
    let azulejo = {
      img: tile.img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI,
      isLadrillo: bool,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }


  for (let i = 0; i < 4; i++) {
    let a = baseAngle + i * HALF_PI;
    let nx = tile.x - cos(a) * tile.xSize*2;
    let ny = tile.y + sin(a) * tile.ySize*2;
    if(i == 1 || i ==2){
      nx = tile.x + cos(a) * tile.xSize;
      ny = tile.y + sin(a) * tile.ySize;
    }
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      //img: azulejos[1].img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: true,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }

  // Plus Ladrillos
  
    for (let i = 0; i < 4; i++) {
    
    let a =baseAngle + PI/4 + i * HALF_PI;
    let bx = tile.x + cos(a) * d * 2;
    let by = tile.y + sin(a) * d * 2;
    if(i == 0){
      bx = tile.x + sin(a) * d;
      by = tile.y + sin(a) * d;
    }
    if(i == 3){
      bx = tile.x - cos(a) * d * 3;
      by = tile.y + cos(a) * d * 1;
    }
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
    results.push(newTile);
  }
  
  return results;
}


waves_simple_horizontal(tile) {
  let results = [];
  let d = this.tileSize / sqrt(2);
  let baseAngle = tile.angle;
  let color = 200 + random(0,55);
  let nalpha = 0;

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + PI/4 + i * HALF_PI;
    let nx = tile.x + cos(a) * d * 4;
    let ny = tile.y + sin(a) * d * 4;
    if (i == 1 || i ==3){
      nx = tile.x + cos(a) * d * 6;
    }
    let azulejo = {
      img: tile.img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI,
      isLadrillo: false,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }

  for (let i = 0; i < 2; i++) {
    let nx;
    let ny;
    if (i == 0){
      nx = tile.x + cos(baseAngle + 3 * HALF_PI) * tile.xSize*3;
      ny = tile.y + cos(baseAngle + PI/4 + 3 * HALF_PI) * d * 3;
    }
    else{
      nx = tile.x + cos(baseAngle + 1 * HALF_PI) * tile.xSize*3;
      ny = tile.y - cos(baseAngle + PI/4 + 1 * HALF_PI) * d * 3;
    }
    let azulejo = {
      img: tile.img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI,
      isLadrillo: true,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg )
    results.push(newTile);
  }
  
  for (let i = 0; i < 4; i++) {
    let a = baseAngle + i * HALF_PI;
    let nx = tile.x - cos(a) * tile.xSize*2;
    let ny = tile.y + sin(a) * tile.ySize*2;
    if(i == 1){
      nx = tile.x + cos(a) * tile.xSize;
      ny = tile.y + sin(a) * tile.ySize;
    }
    if(i == 3){
      nx = tile.x + cos(a) * tile.xSize*2;
      ny = tile.y - sin(a) * tile.ySize*2;
    }
    if(i == 2){
      nx = tile.x - cos(a) * tile.xSize;
      ny = tile.y - sin(a) * tile.ySize;
    }
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      //img: azulejos[1].img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: true,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo,tile.ldrimg )
    results.push(newTile);
  }

  // Plus Ladrillos
  
    for (let i = 0; i < 4; i++) {
    
    let a = baseAngle + PI/4 + i * HALF_PI;
    let bx = tile.x + cos(a) * d * 2;
    let by = tile.y + sin(a) * d * 2;
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg )
    results.push(newTile);
  }

  for (let i = 0; i < 4; i++) {
    let nx;
    let ny;
    if (i == 0){
      nx = tile.x + cos(baseAngle + 3 * HALF_PI) * tile.xSize;
      ny = tile.y - cos(baseAngle + PI/4 + 3 * HALF_PI) * d;
    }
    if (i == 1){
      nx = tile.x + cos(baseAngle + 1 * HALF_PI) * tile.xSize;
      ny = tile.y + cos(baseAngle + PI/4 + 1 * HALF_PI) * d;
    }
    if (i == 2){
      nx = tile.x + cos(baseAngle + 3 * HALF_PI) * tile.xSize *3;
      ny = tile.y + cos(baseAngle + PI/4 + 3 * HALF_PI) * d;
    }
    if (i == 3){
      nx = tile.x - cos(baseAngle + 3 * HALF_PI) * tile.xSize *3;
      ny = tile.y + cos(baseAngle + PI/4 + 3 * HALF_PI) * d;
    }
    let azulejo = {
      img: tile.ldrimg,
      dna: {
      type: tile.type,
      angle: QUARTER_PI,
      isLadrillo: true,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg)
    results.push(newTile);
  }
  
  return results;
}

waves_horizontal(tile) {
  let results = [];
  let d = this.tileSize / sqrt(2);
  let baseAngle = tile.angle;
  let color = 200 + random(0,55);
  let nalpha = 0;

  for (let i = 0; i < 4; i++) {
    let a = baseAngle + PI/4 + i * HALF_PI;
    let bool = false;
    let nx = tile.x + cos(a) * d * 4;
    let ny = tile.y + sin(a) * d * 4;
    if (i == 0 || i == 2){
      nx = tile.x + sin(a) * d * 2;
      bool = false;
    }
    let azulejo = {
      img: tile.img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI,
      isLadrillo: false,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg)
    results.push(newTile);
  }


  for (let i = 0; i < 4; i++) {
    let a = baseAngle + i * HALF_PI;
    let nx = tile.x - cos(a) * tile.xSize*2;
    let ny = tile.y - sin(a) * tile.ySize*2;
    if(i == 0 || i == 1){
      nx = tile.x + cos(a) * tile.xSize;
      ny = tile.y + sin(a) * tile.ySize;
    }
    let randomAngle = [1,3,5,7];
    let azulejo = {
      img: tile.img,
      //img: azulejos[1].img,
      dna: {
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],
      isLadrillo: true,          
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(nx, ny, tile.xSize, tile.ySize, azulejo, tile.ldrimg)
    results.push(newTile);
  }

  // Plus Ladrillos
  
    for (let i = 0; i < 4; i++) {
    
    let a =baseAngle + PI/4 + i * HALF_PI;
    let bx = tile.x + cos(a) * d * 2;
    let by = tile.y + sin(a) * d * 2;
    if(i == 2){
      bx = tile.x + cos(a) * d ;
      by = tile.y + sin(a) * d * 4;
    }
    if(i == 1){
      bx = tile.x + cos(a) * d;
      by = tile.y - cos(a) * d * 3;
    }
    if(i == 3){
      bx = tile.x + cos(a) * d;
      by = tile.y + cos(a) * d * 3;
    }
    let randomAngle = [1,3,5,7];
    let ladrill = {
      img: tile.ldrimg,
      dna:{
      type: tile.type,
      angle: QUARTER_PI * randomAngle[floor(random(4))],// * random(1,4),
      isLadrillo: true,
      ColorL: color,
      alphaA: nalpha,
      speed: tile.speed,
      instrument: tile.instrument
      }
    }
    let newTile = new Tile(bx, by, tile.xSize, tile.ySize, ladrill, tile.ldrimg)
    results.push(newTile);
  }
  
  return results;
}

}