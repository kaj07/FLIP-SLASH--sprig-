/*
@title: FLIP-SLASH
@author: kaj07
@tags: [puzzle]
@addedOn: 2024-00-00
*/

const black = "x"
const border = "z"
const darkGrey = "G"
const grey = "g"
const white = "w"
const button = "a"
const blue = "b"
const red = "c"

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

setSolids([])

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
bbbbbbbbxcccccccc`
]

setMap(levels[level])

// Introduction 

setBackground(black)

let inputUsed = false;
let inputUsed2 = false;
let counter = 0;

const changeTextColor = (color, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      addText("kaj07", { x: 8, y: 8, color });
      resolve();
    }, delay);
  });
}

const changeBackground = (color, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setBackground(color);
      resolve();
    }, delay);
  });
}

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

    const dx = 1;
      
    onInput("a", () => {
      
      if (counter < 8) {
        counter += 1
        console.log("counter: " + counter)
        
        getAll(black).forEach(sprite => {
          addSprite(sprite.x, sprite.y, "c");
          clearTile(sprite.x - dx, sprite.y);
          sprite.x -= dx;
          
          if (sprite.x === 0) {
            clearTile(16, sprite.y);
            addSprite(16, sprite.y, "z");

          }
          
          if (sprite.x === 15) {
            clearTile(16, sprite.y);
            addSprite(16, sprite.y, "c");
            clearTile(0, sprite.y);
            addSprite(0, sprite.y, "b");

          }
        });
      }
    });

    onInput("d", () => {
      
      if (counter > -8) {
        counter -= 1
        console.log("counter: " + counter)
     
        getAll(black).forEach(sprite => {
          addSprite(sprite.x, sprite.y, "b");
          clearTile(sprite.x + dx, sprite.y);
          sprite.x += dx;     
          
          if (sprite.x === 16) {
            clearTile(0, sprite.y);
            addSprite(0, sprite.y, "z");
          
          }
          
          if (sprite.x === 1) {
            clearTile(0, sprite.y);
            addSprite(0, sprite.y, "b");
            clearTile(16, sprite.y);
            addSprite(16, sprite.y, "c");

          }
        });
      }
    });
  }
        }
      });
     })
  }, 2100));
