 /* Developing version of AvatarWorld 

Stuff is are shades of yellow (unknown stuff is still stuff, tools are stuff) 
Avatars are shades of cyan
Walls are black
scent has density < 255.
paths are shades of gray.

*/

PATHCOLOR = 210;


class Grid {
  constructor(gridX, gridY, size, displayArray) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.size = size;
    this.data = this.buildGrid(gridX, gridY);
    this.showGrid = displayArray[0];
    this.showPieces = displayArray[1];
    this.showText = displayArray[2];
  }

  buildGrid(gridWidth, gridHeight) {
    let grid = new Array(gridWidth);
    for (let x = 0; x < gridWidth; x++) {
      grid[x] = new Array(gridHeight);
      for (let y = 0; y < gridHeight; y++)
        grid[x][y] = new WorldObject(this, x, y, PATHCOLOR); //x + y*this.gridX;
    }
    return grid;
  }

  draw() {
    for (let i = 0; i <= this.gridX; i++)
      line(i * this.size, 0, i * this.size, height);
    for (let i = 0; i <= this.gridY; i++)
      line(0, i * this.size, width, i * this.size);
  }

  drawContents() {
    if (this.showGrid) {
      stroke(0);
      this.draw();
    } else noStroke();
    if (this.showText || this.showPieces) {
      for (let x = 0; x < this.gridX; x++) {
        for (let y = 0; y < this.gridY; y++) {
          let item = this.data[x][y];
          // print(item.toString());
          let xPos = item.x * this.size;
          let yPos = item.y * this.size;
          if (this.showPieces) {
            fill(item.myColor);
            rect(xPos, yPos, this.size, this.size);
          }
          if (this.showText) {
            fill(0);
            text(item.id, xPos + this.size / 2, yPos + this.size / 2);
          }
        }
      }
    } // show text 
  } //drawContents

  // Adds agent or physical object
  addObject(x, y, c, type) {
    print("Adding: " + type);
    let obj = this.data[x][y];
    //  print(x + " " + y);
    if (0 <= x && x < this.gridX && 0 <= y && y < this.gridY) {
      obj.myColor = color(c);
      if (type == 'agent') obj.type.push(new AgentBrain(x,y));
      else if (type =='thing') obj.type.push(new StuffInfo(x,y));
      else if (type == 'wall') obj.type.push(new WallInfo(x,y));
      else if (type == 'tool') { print("In tool"); obj.type.push(new ToolInfo       (x,y));}
    // else if (type == 'poison') obj.type.push(new PoisonInfo (x,y));
      else console.log(type + " type not recognized, not added!");

    } else console.log("Position exceeds grid size"); // this needs to be a try catch.
    return obj;

  }
} // class Grid

// This code is LOCKED, post suggestions don't change. 
class WorldObject {
  constructor(grid, x, y, c) {
    this.x = x;
    this.y = y;
    this.id = x + y * grid.gridX;
    this.density = 0;
    this.myColor = color(c);
    this.type = [];
    this.type.push(new Path(x, y));
  }

  showIt() {
    return (this.id + "= " + this.y + ", " + this.x + " D: " + this.density + ", C: " + this.myColor)
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }

}

// This code is LOCKED, post suggestions don't change. 
class ObjectInfo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
} // ObjectInfo

// These are starter objects, you will be expanding these.
class Path extends ObjectInfo {
  constructor(x, y) {
    super(x, y);
    this.typeName = 'path';
  }
} // Path

class Scent extends ObjectInfo {
  constructor(x, y) {
    super(x, y);
    this.typeName = 'scent';
  }
} // Path

class AgentBrain extends ObjectInfo {
  constructor(x, y) {
    super(x, y);
    this.typeName = 'agent';
  }
} //AgentBrain


class StuffInfo extends ObjectInfo {
  constructor(x, y) {
    super(x, y);
    this.typeName = 'food';
  }
} StuffInfo

class WallInfo extends ObjectInfo {
  constructor(x,y) {
    super(x,y);
    this.typeName = 'wall';
  }
} //Wall

 
  class ToolInfo extends ObjectInfo {
    constructor(x,y) {
      super (x,y);
      this.typeName = 'tool';
      }
    }
 /* 
  class PoisonInfo extends ObjectInfo {
  



*/
  