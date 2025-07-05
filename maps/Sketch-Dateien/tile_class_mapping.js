
class Tile {
    constructor(x, y, xSize, ySize, azulejo) {
      this.x = x;
      this.y = y;
      this.xSize = xSize;
      this.ySize = ySize;
      this.type = azulejo.dna.type;
      this.angle = azulejo.dna.angle;
      this.isLadrillo = azulejo.dna.isLadrillo;
      this.img = azulejo.img;
      this.alpha = azulejo.dna.alphaA;
      this.color = azulejo.dna.ColorL;
      this.speed = azulejo.dna.speed;
    }
  
    update() {
      if (this.alpha < 255) {
        this.alpha += 20 * this.speed;
      } else {
        this.alpha = 255;
      }
    }
  
    display(pg) {
      pg.push();
      pg.translate(this.x, this.y);
      pg.rotate(this.angle);
      pg.imageMode(CENTER);
      //glow(color(230 ,200 ,200), 20);
      if (this.isLadrillo) {
        pg.tint(this.color || 255, this.alpha);
        //glow(color(255, 53,55), 35);
        pg.image(this.img, 0, 0, this.xSize, this.ySize);
      } else {
        pg.tint(this.color || 255, this.alpha);
        //glow(color(23, 53,55), 35);
        pg.image(this.img, 0, 0, this.xSize, this.ySize);
      }
      updatecheck = false;
      pg.pop();
    }
  
    touchesEdge() {
      let margin = tileSize * 1.5;
      let triggered = tileManager.edgeTriggered;
      if (!triggered.left && this.x - margin <= 0) return 'left';
      if (!triggered.top && this.y - margin * 1.5 <= 0) return 'top';
      if (!triggered.right && this.x + margin >= width) return 'right';
      if (!triggered.bottom && this.y + margin >= height) return 'bottom';
      return null;
    }
  }
  