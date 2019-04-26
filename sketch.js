/*  This forms the bare bones of the Avatar World.
    Your assignment is sketched in the April 19 web page of
    the class website: 
    https://sites.google.com/a/newschool.edu/lcst2810-s19/weekly-note/week-13-april-19
    
    Before launching into the actual assignment, duplicate this project, 
    and with a partner, explore how it works. Comment the code!
    Answer these questions, and any others that emerge:
    
    1) Where is the avatar and where is the food?
    2) How are the colors and text turned on and off?
    3) The library AvatarWorld contains class definition outlines for:
        Agent
        Thing
        Wall
        Scent
        
        Which ones are fully implemented and which ones must you flesh out?
    4) How can you identify the type of an object?
    5) Which objects are 'solid' and which ones are 'ephemeral' - what does density do? 
       (hint: you may need to research color a bit)
    6) The numbers on the grid are marginally helpful.  
       What woud you need to change to print the x,y coords instead?
    7) You will probably want to play with a bigger grid, practice that for a bit as well.
    8) Take notes on suggestions for improving the code, but do NOT CHANGE ANYCODE THAT IS MARKED as 'locked'.
    
 */
let gridWidth = 10;
let gridHeight = 10;
let tileSize = 50;
let theWorld;

let showingGrid = true;
let showingObjects = true;
let showingText = true;

let avatar; // requires a physical space
let foe;
let food; // requires a physical space
let tool;
let poison;
let wall;
let levels = 2;  // warning for now, make this less than the width & height by 2  of the grid!
let density = 255;
let densityReduction = density / (levels);

let FOODCOLOR;
let FOECOLOR;
let AVATARCOLOR;
let TOOLCOLOR;
let POISONCOLOR;
let WALLCOLOR;

function setup() {
  createCanvas((gridWidth * tileSize) + 1, (gridHeight * tileSize) + 1);
  textSize(tileSize / 4);
  textAlign(CENTER, BASELINE);
  theWorld = new Grid(gridWidth, gridHeight, tileSize, [showingGrid, showingObjects, showingText]);


    FOODCOLOR = color(255, 255, 0);
    food = theWorld.addObject(5, 5, FOODCOLOR, "thing");

    AVATARCOLOR = color(0, 255, 255);
    avatar = theWorld.addObject(0, 0, AVATARCOLOR, "agent");
  
    FOECOLOR= color (255, 200, 200)
    foe = theWorld.addObject(9, 9, FOECOLOR, "foe");
  
    TOOLCOLOR = color(255, 0, 255);
    tool = theWorld.addObject( 2, 2, TOOLCOLOR, "tool");
    tool = theWorld.addObject( 4, 9, TOOLCOLOR, "tool");
  
    POISONCOLOR = color(255, 0, 0);
    poison = theWorld.addObject( 5, 1, POISONCOLOR, "poison");
    poison = theWorld.addObject( 2, 8, POISONCOLOR, "poison");
   
    WALLCOLOR= color (0);
    wall = theWorld.addObject (1,1, WALLCOLOR, "wall");
    wall = theWorld.addObject (2,1, WALLCOLOR, "wall");
    wall = theWorld.addObject (1,2, WALLCOLOR, "wall");
    wall = theWorld.addObject (7,7, WALLCOLOR, "wall");
    wall = theWorld.addObject (7,8, WALLCOLOR, "wall");
    wall = theWorld.addObject (8,7, WALLCOLOR, "wall");
    wall = theWorld.addObject (7,6, WALLCOLOR, "wall");
  
  
  for (let i = 1; i < levels; i++) {
    density -= densityReduction;
    showScent(food, i, density);
  } 
  
  for (let i = 1; i < levels; i++) {
    density -= densityReduction;
    showScent(poison, i, density); 
  }
  
  print(theWorld); // This is for debugging purposes
  //noLoop(); // will have to loop for keyboard stuff.
} // setup


// This code is LOCKED, post suggestions don't change. 
function draw() {
  background(220);
  theWorld.drawContents();
  /*avatar.checkCollison(food); 
    avatar.checkCollison(tool);
    avatar.checkCollison(poison);
    avatar.checkCollison(scent);
    print in console.log;
  */
} // draw

// This code is LOCKED, post suggestions don't change. 
function showScent(seed, level, density) {
/* THIS IS STILL BUGGY... fix later!
   It breaks when the size of the grid is smaller than the scent level ! */
  let myColor = seed.myColor;
  // times = 2*level + 1
  yTop = seed.Y - level;
  yBottom = seed.Y + level;
  for (let i = -level; i <= level; i++) {
    xPos = seed.X - i;
    if (xPos >= 0 && xPos < tileSize) {
      if (yTop >= 0) makeScent(xPos, yTop, density, myColor);
      if (yBottom < tileSize) makeScent(xPos, yBottom, density, myColor);
    }
  }

  xLeft = seed.X - level;
  xRight = seed.X + level;
  // times = 2*level-1
  for (let i = 1; i <= 2 * level - 1; i++) {
    yPos = seed.Y - i + level;
    if (yPos >= 0 && yPos < tileSize) {
      if (xLeft >= 0) makeScent(xLeft, yPos, density, myColor);
      if (xRight < tileSize) makeScent(xRight, yPos, density, myColor);
    }
  }
} // showScent

// This code is LOCKED, post suggestions don't change. 
function makeScent(x, y, density, myColor) {
// print("In Scent: " + x + " " + y);
  obj = theWorld.data[x][y];
  obj.density = density;
  obj.myColor = color(red(myColor), green(myColor), blue(myColor), density);
  obj.type.push(new Scent(x,y));
} // makeScent


//THIS MOVES TILE. DATA AND TILE ARE LINKED
//WILL HAVE TO MOVE THE DATA, NOT TILE
//avatar.x +=1;
function moveAvatar(ava,mvX,mvY){
  x = ava.x
  y= ava.y
  obj = theWorld.data[x][y];
  //target = theWorld.data[x+mvX][y+mvY]
  type = obj.type
  // console.log(type)
  for(i=0;i<type.length;i++){
    if(type[i].typeName=='agent'){
      avatar = theWorld.addObject(x+mvX, y+mvY, AVATARCOLOR, "agent");
      type.splice(i,1);
    }
  }
  // console.log(type);
  //idx = type.findIndex(avatar);
  //console.log(type.findIndex(type.find(e=>e.typeName=='agent')));
  //avatar = theWorld.addObject(x+1, y, AVATARCOLOR, "agent");
  //obj.type.push(new AgentBrain(x+1,y));
}

function keyPressed() {
  //dredraw()
  
  switch(key){
    case 'w':
    moveAvatar(avatar,0,-1);
    
    break;
    case 's':
    moveAvatar(avatar,0,1);
    
    break;
    case 'a':
    moveAvatar(avatar,-1,0);
    
    break
    case 'd':
    
    moveAvatar(avatar,1,0);
    
    break;
    
  }
}