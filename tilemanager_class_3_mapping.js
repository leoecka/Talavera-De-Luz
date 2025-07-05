
class TileManager {
    constructor(tileSizes) {
      this.tileSize = tileSizes;
      this.spreadManager = new SpreadManager(this.tileSize);
      this.sound = new Sound();
      this.currentGen = [];
      this.generations = new Map();
      //this.nextGen = [];

      this.placedTiles = new Map(); 
      this.occupied = new Set();
      this.edgeTriggered = { top: false, right: false, bottom: false, left: false };
      //this.animatingTile = null;
      this.animatingTiles = new Map();
      this.buffer = createGraphics(width, height); 
      this.buffer.pixelDensity(1);
      this.animationBuffer = createGraphics(width, height);
      this.animationBuffer.pixelDensity(1);
    }
  
    posKey(x, y) {
      return `${round(x)}_${round(y)}`;
    }
  
    inBounds(x, y) {
      return (
        x - this.tileSize /2 > 0 &&
        y - this.tileSize /2 > 0 &&
        x + this.tileSize /2 < width &&
        y + this.tileSize / 2 < height
      );
    }
  
    start() {
      //let x = width / 2;
      //let y = height / 2;
      let rangeX = floor(width / this.tileSize / 3);
      let rangeY = floor(height / this.tileSize / 3);
      let step = this.tileSize / sqrt(2) * 2;
      
      let x = width / 2 + floor(random(-rangeX, rangeX)) * step;
      let y = height / 2 + floor(random(-rangeY, rangeY)) * step;  
      //let azulejo = azulejos[1];
      let azulejo = azulejos[floor(random(azulejos.length))];
      //let ldr = ladrillo[0];
      let ldr = ladrillo[floor(random(ladrillo.length))];
      let startTile = new Tile(x, y, this.tileSize, this.tileSize, azulejo, ldr);
      this.initType(startTile.type);
      this.generations.get(startTile.type).currentGen.push(startTile);
      //this.currentGen.push(startTile);
      this.occupied.add(this.posKey(x, y));
    }

    initType(type) {
      if (!this.generations.has(type)) {
        this.generations.set(type, { currentGen: [], nextGen: [], pending: [] });
      }
    }
  
    shouldRestart() {
      let allEmpty = true;
    
      this.generations.forEach((gen) => {
        if (gen.currentGen.length > 0 || gen.nextGen.length > 0) {
          allEmpty = false;
        }
      });
    
      return allEmpty && this.animatingTiles.size === 0;
    }
  
    generate() {
      // Generierung nur fortsetzen, wenn genügend Platz verfügbar ist
      if (this.placedTiles.size > (width / this.tileSize * height / this.tileSize / 2)) {
        const firstKey = this.placedTiles.keys().next().value;
        const firstTile = this.placedTiles.get(firstKey);
  
        // Übermalen im Buffer
        this.buffer.push();
        this.buffer.translate(firstTile.x, firstTile.y);
        this.buffer.rotate(firstTile.angle); 
        this.buffer.rectMode(CENTER);
        this.buffer.noStroke()
        this.buffer.fill(backgroundColor, 255);
        this.buffer.rect(0, 0, firstTile.xSize, firstTile.ySize);        
        this.buffer.pop();
  
        this.placedTiles.delete(firstKey);
      }
  
      let anyAnimating = false;
      this.generations.forEach((gen, type) => {
        if (this.animatingTiles.has(type)) {
          anyAnimating = true;
          return; // Skip if this type is still animating
        }

        if (gen.currentGen.length === 0 && gen.nextGen.length > 0) {
          gen.currentGen = gen.nextGen;
          gen.nextGen = [];
        }
        
        if (gen.currentGen.length > 0) {
          let idx = floor(random(gen.currentGen.length));
          let tile = gen.currentGen.splice(idx, 1)[0];
      
          let edge = tile.touchesEdge();
          if (edge) {
            this.edgeTriggered[edge] = true;
            this.restartGrowthFrom(tile);
            if (this.allEdgesTouched()) {
              this.restartGrowthFrom(tile);
              this.resetEdges();
              return;
            }
          }
      
          this.animatingTiles.set(type, tile);
      
          if (!tile.isLadrillo) {
            this.pendingNeighbors = this.spreadManager.getNextTiles(tile)
              .filter(n => {
                let key = this.posKey(n.x, n.y);
                return !this.occupied.has(key) && this.inBounds(n.x, n.y);
              });
          }
        }

        if (this.shouldRestart() && start) {
          start = false;
          this.occupied.clear();
          //this.generations.clear();
          //this.placedTiles.clear();
          //this.animatingTiles.clear();
          this.resetEdges();
          this.start();
          setTimeout(() => tileManager.start(), 200);  
          print("RESTART triggered");
        }

      });
    }
  

    draw() {
      
      //image(this.buffer, 0, 0); // gezeichnete Tiles anzeigen
      this.animationBuffer.clear();
    
      this.animatingTiles.forEach((tile, type) => {
        tile.update();
        tile.display(this.animationBuffer);
        //print(this.sound.soundReady.guitar);
        
        //if (tile.alpha >= 255 && this.sound.soundReady.guitar == true) {
        if (tile.alpha >= 255) {
          let key = this.posKey(tile.x, tile.y);

          this.placedTiles.set(key, tile);
          
          this.occupied.add(key);
          

          this.buffer.push();
          this.buffer.translate(tile.x, tile.y);  
          this.buffer.rotate(tile.angle + random(-0.06, 0.06) || 0);
          this.buffer.imageMode(CENTER);
          this.buffer.tint(tile.color || 255, tile.alpha);
          //glow(color(255, 53,55), 35);
          this.buffer.image(tile.img, 0, 0, tile.xSize - offset, tile.ySize - offset);
          this.buffer.pop();
          
          // Nachbarn hinzufügen
          if (this.pendingNeighbors && this.pendingNeighbors.length > 0) {
            this.pendingNeighbors.forEach(n => {
              this.initType(n.type); // <- wichtig
              this.generations.get(n.type).nextGen.push(n);
              //this.occupied.add(this.posKey(n.x, n.y));
              
              if(!n.isLadrillo){
                this.occupied.add(this.posKey(n.x, n.y));
                }
            });
          }

          //this.sound.getSound(tile);
          
          this.pendingNeighbors = null;
      
          this.animatingTiles.delete(type); // Animation abgeschlossen
          start = true;
        }
      });

    }
  
    allEdgesTouched() {
      return this.edgeTriggered.top && this.edgeTriggered.right &&
             this.edgeTriggered.bottom && this.edgeTriggered.left;
    }
  
    resetEdges() {
      this.edgeTriggered = { top: false, right: false, bottom: false, left: false };
    }
    
    restartGrowthFrom(tile) {
      this.generations.get(tile.type).currentGen = [];
      //this.nextGen = [];
      //this.occupied.clear();
  
      //let azulejo = random(azulejos);

      let azulejo;
      // Zufällig ein Azulejo aus dem Array wählen, das einen anderen Typ hat als tile.type
      azulejo = random(azulejos.filter(a => a.dna.type !== tile.type));
      print(tile.type);
      print(azulejo.dna.type);
      let ldr = ladrillo[floor(random(ladrillo.length))];
      //let ldr = ladrillo[1];

      let newTile = new Tile(tile.x, tile.y, this.tileSize, this.tileSize, azulejo, ldr);
      this.initType(newTile.type);
      this.generations.get(newTile.type).currentGen.push(newTile);
      this.occupied.add(this.posKey(newTile.x, newTile.y));
    }
  }