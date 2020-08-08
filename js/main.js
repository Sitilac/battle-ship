/*----- constants -----*/
const ships = {
  carrier: 5,
  battleship: 4,
  submarine: 3,
  cruiser: 2,
  destroyer: 1,
};
/*----- app's state (variables) -----*/
let turn;
let computerGrid;
let playerGrid;
/*----- cached element references -----*/
let playerGridEl = document.getElementById("playerGrid");
let computerGridEl = document.getElementById("computerGrid");
/*----- event listeners -----*/
/*----- functions -----*/
function init() {
  gridInitalize();
  render();
}

function render() {
  gridElInitialize();
}

function computerPosInit() {
  const entries = Object.entries(ships);
  for (const [key, value] of Object.entries(ships)) {
    console.log(`${key}: ${value}`);
    let randX = Math.floor(Math.random() * 10);
    let randY = Math.floor(Math.random() * 10);
    for (let i = 0; i < value; i++) {
      if (10 - randX <= value && 10 - randY < value) {
        computerGrid[randX][randY + i] = 1;
      } else if (10 - randY < value) {
        computerGrid[randX + 1][randY] = 1;
      }
    }
  }
}
//Grid Initialization functions
function gridInitalize() {
  playerGrid = [];
  computerGrid = [];
  for (let i = 0; i < 10; i++) {
    playerGrid.push([]);
    computerGrid.push([]);
    for (let j = 0; j < 10; j++) {
      playerGrid[i][j] = 0;
      computerGrid[i][j] = 0;
    }
  }
}
function gridElInitialize() {
  for (let i = 0; i < 10; i++) {
    let rowP = playerGridEl.insertRow(i);
    let rowC = computerGridEl.insertRow(i);
    for (let j = 0; j < 10; j++) {
      rowP.insertCell(j);
      rowC.insertCell(j);
    }
  }
}

init();

/* Pseudo Notes 

//constants
the ship sizes will be constant

//app's state
Have a current turn state
player and computer board with hits and misses
possible "computerhitstate" AI.

//cached elements
2 2 dimensional arrays one for player and one for computer.
These 2 arrays will be modified with the player/computer ship positions and hit states

//event listeners
will have an event listener related to click target in order for the player to make a turn
when it comes to initalizing the board might also use a drag and drop api event listener

//functions
initalize will render both player and comnputer board to 0 which has a 3 state possibly 0 for nothing 1 for ship and -1 for it
computer board will be initialized using a rand function.
both boards will be made using a nested for loop to create 10 div columns with 10 div rows.
each div spot will also at the same time be initialized to a certain point in the player array.

computerAi: Computer ai will just function on a 2 rand setup 1 rand being the column 1 rand being the row.
If a position is occupied by player then mark as a hit otherwise mark as a miss. If it's a repeat then
return and redo the rand.
(Additional ai for when everything works) Computer will expand vertically/horizontally on the hit.
It will search all 4 locations from the hit (top,down,left,right) once a consecutive hit has been made
computer will follow that hit until a miss once that miss is registered loop back to original AI.


*/
