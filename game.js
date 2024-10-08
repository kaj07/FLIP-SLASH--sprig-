/*
@title: FLIP-SLASH
@author: kaj07
@tags: [puzzle] , [logic]
@addedOn: 2024-00-00
*/

// Variables and Constants

let level = 0
const levels = [
  map`
...........
...........
...........
...........
...........
...........
...........
...........`,
  map `
ccccccccbbbbbbbb
c..............b
c..............b
c..............b
c..............b
c..............b
c..a........a..b
c.a.a......a.a.b
c..a........a..b
c..............b
c..............b
c..............b
ccccccccbbbbbbbb`,
  map `
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc`,
  map `
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
bbbbbbbbxcccccccc
zzzzzzzzxcccccccc
ccccccccccccccccc
ccccccccccccccccc
ccccccccccccccccc
ccccccccccccccccc
ccccccccccccccccc
ccccccccccccccccc`,
  map `
bcbc
cbcb
bcbc
cbcb` 
]

const black = "x"
const border = "z"
const darkGrey = "G"
const grey = "g"
const white = "w"
const button = "a"
const blue = "b"
const red = "c"

let inputUsed = false;
let inputUsed2 = false;
let slashCheck = false;
let counter = 0;

let numberOfBlue = getAll(blue).length;
let numberOfRed  = getAll(red).length;

let hozLinX = 8;     // The x and y for the horizontal line in level 2
let hozLinY = 5;

// Music and SFX

const opWin = tune `
150: C4/150,
150: C4/150,
4500`           // sfx for full screen red

// Legend

setLegend(
  [ black, bitmap `
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ border, bitmap `
0000000000002222
0000000000000002
0000000000000002
0000000000000002
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ darkGrey, bitmap `
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ grey, bitmap `
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ white, bitmap `
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ button, bitmap `
......0000......
....00LLLL00....
...0LL1111LL0...
..0L11111111L0..
.0L1111111111L0.
.0L1111111111L0.
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
.0L1111111111L0.
.0L1111111111L0.
..0L11111111L0..
...0LL1111LL0...
....00LLLL00....
......0000......`],
  [ blue , bitmap `
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ red, bitmap `
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
)

// Functions

function checkColours() {
    numberOfBlue = getAll(blue).length;
    numberOfRed = getAll(red).length;    
    console.log("blues: " + numberOfBlue)
    console.log("reds: " + numberOfRed)   

    if (numberOfBlue == 180 || numberOfBlue == 187) {
      console.log("sfx for win")
      level += 1
      setMap(levels[level]);
      counter = 0;
    }
  
    if (numberOfRed == 180 || numberOfRed == 187) {
      console.log("sfx for opWin")
    }
}    // does stuff based on amount of red or blue

function moveLineRight() {
  getAll(black).forEach(sprite => {
            addSprite(sprite.x, sprite.y, "b");
            clearTile(sprite.x + 1, sprite.y);
            sprite.x += 1;
  });
} // will add into code soon

const changeTextColor = (color, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      addText("kaj07", { x: 8, y: 8, color });
      resolve();
    }, delay);
  });
} // as described for intro

const changeBackground = (color, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setBackground(color);
      resolve();
    }, delay);
  });
} // as described for intro


// Main Program

setMap(levels[level])
setBackground(black)

addText("kaj07", { x: 8, y: 8, color: color`2`})

changeTextColor(color`1`, 1000)
  .then(() => changeTextColor(color`L`, 1000))
  .then(() => changeTextColor(color`0`, 1000))
  .then(() => {
    clearText();
  })
  .then(() => changeBackground(darkGrey, 1000))
  .then(() => changeBackground(grey, 1000))
  .then(() => changeBackground(white, 1000))
  .then(() => setTimeout(() => {
    addText("FLIP", { x: 5, y: 3, color: color `7`});
  }, 700))
  .then(() => setTimeout(() => {
    addText("-SLASH", { x: 9, y: 3, color: color `3`});
  }, 1400))
  .then(() => setTimeout(() => {
    addText("(PRESS!)", { x: 6, y: 12, color: color `0`})
    level += 1
    setMap(levels[level]);
    ["w", "a", "s", "d", "i", "j", "k", "l"].forEach(key => {
      onInput(key, () => {
        if (!inputUsed) {
          level += 1
          inputUsed = true;
    setMap(levels[level]);
      if( level === 2 && !inputUsed2) {
        clearText();
        setMap(levels[level]);
        inputUsed2 = true;
        
    onInput("a", () => {
      
      checkColours()

      if (level == 2) {                           // controls for level 1
        if (counter < 8) {
          counter += 1
          console.log("counter: " + counter)
          
          getAll(black).forEach(sprite => {
            addSprite(sprite.x, sprite.y, "c");
            clearTile(sprite.x - 1, sprite.y);
            sprite.x -= 1;
            
            if (sprite.x === 0) {                 // add border when screen red
              clearTile(16, sprite.y);
              addSprite(16, sprite.y, "z");
  
            }
            
            if (sprite.x === 15) {               // remove border when screen was blue
              clearTile(16, sprite.y);           // however the border isn't ever seen
              addSprite(16, sprite.y, "c");
              clearTile(0, sprite.y);
              addSprite(0, sprite.y, "b");
  
            }
          });
        }
      }

    if (level == 3) {                             // controls for level 2
      if (counter < 8 && !(slashCheck)) {         
        counter += 1;
        console.log("counter: " + counter);
        
          getAll(black).forEach(sprite => {
            addSprite(sprite.x, sprite.y, "c");
            clearTile(sprite.x - 1, sprite.y);
            sprite.x -= 1;

/*            if (sprite.x === 0) {                 // add border
              clearTile(16, sprite.y);
              addSprite(16, sprite.y, "z");
              clearTile(16, sprite.y + 6);
              addSprite(16, sprite.y + 6, "z");
              clearTile(0, sprite.y + 6);
              addSprite(0, sprite.y + 6, "z");
  
              }
*/
          });
      clearTile(hozLinX, hozLinY);
      addSprite(hozLinX, hozLinY, "c");
      hozLinX -= 1
      }
    }
  });

    onInput("d", () => {
      
      checkColours()
      
      if (level == 2) {                          // controls for level 1
        if (counter > -8) {
          counter -= 1
          console.log("counter: " + counter)
                      
          getAll(black).forEach(sprite => {
            addSprite(sprite.x, sprite.y, "b");
            clearTile(sprite.x + 1, sprite.y);
            sprite.x += 1;     
            
            if (sprite.x === 16) {                // add border when screen blue
              clearTile(0, sprite.y);             // not used as level increments
              addSprite(0, sprite.y, "z");
            
            }
            
            if (sprite.x === 1) {                 // remove border when screen was red
              clearTile(0, sprite.y);
              addSprite(0, sprite.y, "b");
              clearTile(16, sprite.y);
              addSprite(16, sprite.y, "c");
  
            }
          });
        }
      }
    if (level == 3) {                           // controls for level 2

      numberOfBlue = getAll(blue).length;
      if (numberOfBlue == 96 || numberOfBlue == 88) {  // switches controls when half screen blue
        console.log("sfx for slash")
        slashCheck = true
        counter = 0
        
        getAll(black).forEach(sprite => {          // slashes old line
          if (sprite.y != 5) {
            clearTile(sprite.x , sprite.y);
            addSprite(sprite.x , sprite.y, "b");
          }
        });
        
        getAll(border).forEach(sprite => {       // converts hoz line to make it moveable
          clearTile(sprite.x , sprite.y);
          addSprite(sprite.x , sprite.y, "x");
        });
      }
        
      if (counter > -8 && !(slashCheck)) {
        counter -= 1;
        console.log("counter: " + counter);
        
          getAll(black).forEach(sprite => {
            addSprite(sprite.x, sprite.y, "b");
            clearTile(sprite.x + 1, sprite.y);
            sprite.x += 1;  
          });
      addSprite(hozLinX, hozLinY, "z");
      hozLinX += 1
      }
    }
    });

    onInput("w", () => {

      checkColours()
      
      if (level == 3 && slashCheck == true && counter <5) { // controls only work at level 2
        counter += 1;
        console.log("counter: " + counter);
        
        getAll(black).forEach(sprite => {
          addSprite(sprite.x, sprite.y, "c");
          clearTile(sprite.x, sprite.y -1);
          sprite.y -= 1;
        });
      }
    });

    onInput("s", () => {

      checkColours()
      
      if (level == 3 && slashCheck == true && counter > -6) { // controls only work at level 2
        counter -= 1;
        console.log("counter: " + counter);
        
        getAll(black).forEach(sprite => {
          addSprite(sprite.x, sprite.y, "b");
          clearTile(sprite.x, sprite.y +1);
          sprite.y += 1;
        });
      }
    });
        
  }
        }
      });
     })
}, 2100));