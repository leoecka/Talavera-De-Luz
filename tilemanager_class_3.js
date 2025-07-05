
class TileManager {
    constructor() {
      this.tileSize = tileSize;
      this.spreadManager = new SpreadManager(this.tileSize);
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
    }
  
    posKey(x, y) {
      return `${round(x)}_${round(y)}`;
    }
  
    inBounds(x, y) {
      return (
        x - this.tileSize / 2 > 0 &&
        y - this.tileSize / 2 > 0 &&
        x + this.tileSize / 2 < width &&
        y + this.tileSize / 2 < height
      );
    }
  
    start() {
      let x = width / 3;
      let y = height / 4;
      let azulejo = azulejos[0];
      let startTile = new Tile(x, y, this.tileSize, this.tileSize, azulejo);
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
  
  
    generate() {
      // Generierung nur fortsetzen, wenn genügend Platz verfügbar ist
      if (this.placedTiles.size > (width / this.tileSize * height / this.tileSize / 4)) {
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
      });
    }
  

    draw() {
      
      image(this.buffer, 0, 0); // gezeichnete Tiles anzeigen
      
    
      this.animatingTiles.forEach((tile, type) => {
        tile.update();
        tile.display();
      
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
              this.occupied.add(this.posKey(n.x, n.y));
            });
          }
          this.pendingNeighbors = null;
      
          this.animatingTiles.delete(type); // Animation abgeschlossen
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
      this.occupied.clear();
  
      //let azulejo = random(azulejos);

      let azulejo;
      // Zufällig ein Azulejo aus dem Array wählen, das einen anderen Typ hat als tile.type
      azulejo = random(azulejos.filter(a => a.dna.type !== tile.type));
      print(tile.type);
      print(azulejo.dna.type);
      let newTile = new Tile(tile.x, tile.y, this.tileSize, this.tileSize, azulejo);
      this.initType(newTile.type);
      this.generations.get(newTile.type).currentGen.push(newTile);
      this.occupied.add(this.posKey(newTile.x, newTile.y));
    }
  }