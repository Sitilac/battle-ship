/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/



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