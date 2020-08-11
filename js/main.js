/*----- constants -----*/
const ships = {
  carrier: 5,
  battleship: 4,
  submarine: 3,
  cruiser: 3,
  destroyer: 2,
};

const shipsValue = {
  carrier: 0,
  battleship: 1,
  submarine: 2,
  cruiser: 3,
  destroyer: 4,
};
const letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
/*----- app's state (variables) -----*/
let turn;
let computerGrid;
let playerGrid;
const player = {
  playerGuesses: [],
  playerPositions: [],
  playerHitCounter: 0,
  playerIsHit: false,
  playerIsMiss: false,
};
const computer = {
  computerGuesses: [],
  computerPositions: [],
  rowIndex: 0,
  cellIndex: 0,
  computerHitCounter: 0,
  computerIsHit: false,
  computerIsMiss: false,
};
let cellIndex;
let rowIndex;
let prevRowIndex;
let prevCellIndex;
let shipsUsed;
let shipClass;

/*----- cached element references -----*/
const playerGridEl = document.getElementById("playerGrid");
const computerGridEl = document.getElementById("computerGrid");
const shipEl = document.querySelectorAll(".ships");

/*----- event listeners -----*/
computerGridEl.addEventListener("click", function (e) {
  cellIndex = e.target.cellIndex;
  rowIndex = e.target.parentElement.rowIndex;
  playGame();
});
playerGridEl.addEventListener("click", playerChoose);
document.querySelectorAll(".ships").forEach((ship) => {
  ship.addEventListener("click", function (e) {
    //console.log(e.target.className);
    shipClass = e.target.className;
  });
});

//playerGridEl.addEventListener('mouseover', highlightOver)
/*----- functions -----*/
function init() {
  playerGridEl.innerHTML = "";
  computerGridEl.innerHTML = "";
  gridInitalize();
  computerPosInit();
  //playerPosInit();
  gridElInitialize();
  turn = "initalize";
  shipsUsed = [];
  shipSize = 0;
}
function playGame() {
  playerHitCheck(cellIndex, rowIndex);
  computerHitCheck();
  render();
}
function render() {
  if (turn === "initalize") {
    playerGridEl.rows[rowIndex].cells[cellIndex].bgColor = "blue";
  }
  if (turn === "player") {
    if (player.playerIsHit === true) {
      computerGridEl.rows[rowIndex].cells[cellIndex].style.backgroundColor =
        "green";
    } else if (player.playerIsMiss === true) {
      computerGridEl.rows[rowIndex].cells[cellIndex].style.backgroundColor =
        "red";
    }

    if (computer.computerIsHit === true) {
      playerGridEl.rows[computer.rowIndex + 1].cells[
        computer.cellIndex + 1
      ].bgColor = "green";
    } else if (computer.computerIsMiss === true) {
      playerGridEl.rows[computer.rowIndex + 1].cells[
        computer.cellIndex + 1
      ].bgColor = "red";
    }
  }
  if (turn !== "initialize") {
    document.getElementById("shipsContainer").display = "none";
  }
  if (player.playerHitCounter === 17) {
    alert("You win!");
  }
}
/*---------------Computer functions -------------------------*/
function computerPosInit() {
  //const entries = Object.entries(ships);
  for (const [key, value] of Object.entries(ships)) {
    console.log(`${key}: ${value}`);
    //Random values for computer X and Y coordinates
    let randX = rand();
    let randY = rand();
    let flag = randX > 5 ? "x" : "y";
    while (checkDuplicate(randX, randY, flag, value)) {
      randX = rand();
      randY = rand();
    }
    //For loop to draw the computer's ship position on the grid.
    if (flag === "x") {
      for (let i = 0; i < value; i++) {
        if (10 - randX <= value) {
          computer.computerPositions.push([randX - i, randY]);
          computerGrid[randX - i][randY] = 1;
        } else if (10 - randX > value) {
          computer.computerPositions.push([randX + i, randY]);
          computerGrid[randX + i][randY] = 1;
        }
      }
    } else if (flag === "y") {
      for (let i = 0; i < value; i++) {
        if (10 - randY <= value) {
          computer.computerPositions.push([randX, randY - i]);
          computerGrid[randX][randY - i] = 1;
        } else if (10 - randY > value) {
          computer.computerPositions.push([randX, randY + i]);
          computerGrid[randX][randY + i] = 1;
        }
      }
    }
  }
}

function checkDuplicate(randNumX, randNumY, flag, value) {
  let checkArray = [];
  checkArray.push([randNumX, randNumY]);

  if (flag === "x") {
    if (10 - randNumX <= value) {
      for (let i = 0; i < value; i++) {
        if (findCoord(computer.computerPositions, checkArray[0])) {
          return true;
        }
        checkArray[0] = [randNumX - i, randNumY];
      }
    }
    if (10 - randNumX > value) {
      for (let i = 0; i < value; i++) {
        if (findCoord(computer.computerPositions, checkArray)) {
          return true;
        }
        checkArray[0] = [randNumX + i, randNumY];
      }
    }
    return false;
  } else if (flag === "y") {
    if (10 - randNumY <= value) {
      for (let i = 0; i < value; i++) {
        if (findCoord(computer.computerPositions, checkArray)) {
          return true;
        }
        checkArray.pop();
        checkArray.push([randNumX, randNumY - i]);
      }
      if (10 - randNumY > value) {
        for (let i = 0; i < value; i++) {
          if (findCoord(computer.computerPositions, checkArray)) {
            return true;
          }
          checkArray.pop();
          checkArray.push([randNumX, randNumY + i]);
        }
      }
    }
    return false;
  }
}
function computerHitCheck() {
  let compX = rand();
  let compY = rand();
  let compareArray = [];
  compareArray.push([compX, compY]);
  while (findCoord(computer.computerGuesses, compareArray[0])) {
    compX = rand();
    compY = rand();
    compareArray.pop();
    compareArray.push([compX, compY]);
  }
  if (findCoord(player.playerPositions, compareArray[0])) {
    computer.rowIndex = compX;
    computer.cellIndex = compY;
    computer.computerGuesses.push([compX, compY]);
    computer.computerIsHit = true;
    computer.computerIsMiss = false;
    computer.computerHitCounter++;
    playerGrid[compX][compY] = 2;
  } else {
    computer.rowIndex = compX;
    computer.cellIndex = compY;
    playerGrid[compX][compY] = -1;
    computer.computerGuesses.push([compX, compY]);
    computer.computerIsMiss = true;
    computer.computerIsHit = false;
  }
  render();
}

/*-----------------Player Functions ------------------- */
function playerChoose(e) {
  cellIndex = e.target.cellIndex;
  rowIndex = e.target.parentElement.rowIndex;
  if (!shipsUsed.includes(shipClass)) {
    shipSize = ships[shipClass];
    shipsUsed.push(shipClass);
    prevCellIndex = undefined;
    prevRowIndex = undefined;
  }
  if (shipsUsed.includes(shipClass)) {
    let position = shipsValue[shipClass];
    shipEl[position].style.visibility = "hidden";
  }
  if (rowIndex !== 0 && cellIndex !== 0) {
    if (shipSize > 0) {
      if (prevCellIndex === undefined) {
        player.playerPositions.push([rowIndex - 1, cellIndex - 1]);
        prevRowIndex = rowIndex;
        prevCellIndex = cellIndex;
        shipSize--;
        render();
      } else if (
        rowIndex === prevRowIndex + 1 ||
        rowIndex === prevRowIndex - 1 ||
        cellIndex === prevCellIndex + 1 ||
        cellIndex === prevCellIndex - 1
      ) {
        player.playerPositions.push([rowIndex - 1, cellIndex - 1]);
        prevRowIndex = rowIndex;
        prevCellIndex = cellIndex;
        shipSize--;
        render();
      }
    }
  }
  if (shipsUsed.length === 5 && shipSize === 0) {
    turn = "player";
  }
}

function playerHitCheck(cellIdx, rowIdx) {
  let compareArray = [];
  compareArray.push([rowIdx - 1, cellIdx - 1]);
  //console.log(compareArray);
  //Passes compareArray with position 0 since there's only 1 element.
  if (!findCoord(player.playerGuesses, compareArray[0])) {
    if (findCoord(computer.computerPositions, compareArray[0])) {
      computerGrid[rowIdx - 1][cellIdx - 1] = 2;
      player.playerHitCounter += 1;
      player.playerGuesses.push([rowIdx - 1, cellIdx - 1]);
      player.playerIsHit = true;
      player.playerIsMiss = false;
    } else {
      computerGrid[rowIdx - 1][cellIdx - 1] = -1;
      player.playerGuesses.push([rowIdx - 1, cellIdx - 1]);
      player.playerIsMiss = true;
      player.playerIsHit = false;
    }
  }
}
/*----------------Helper Functions ----------------- */
function findCoord(arr, coord) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {
      return true;
    }
  }
  return false;
}
function rand() {
  return Math.floor(Math.random() * 10);
}

//********************* Grid Initialize Functions****************************** */
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
  for (let i = 0; i < 11; i++) {
    let rowP = playerGridEl.insertRow(i);
    let rowC = computerGridEl.insertRow(i);
    for (let j = 0; j < 11; j++) {
      rowP.insertCell(j);
      rowC.insertCell(j);
    }
  }
  gridLetterInit();
}
function gridLetterInit() {
  for (let i = 1; i < 11; i++) {
    playerGridEl.rows[0].cells[i].innerText = `${i}`;
    playerGridEl.rows[i].cells[0].innerText = letterArray[i - 1];
    computerGridEl.rows[i].cells[0].innerText = letterArray[i - 1];
    computerGridEl.rows[0].cells[i].innerText = `${i}`;
  }
  gridIdInit();
}
function gridIdInit() {
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      playerGridEl.rows[i].cells[j].id = `[${i - 1}, ${j - 1}]`;
      computerGridEl.rows[i].cells[j].id = `[${i - 1}, ${j - 1}]`;
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
