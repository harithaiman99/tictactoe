/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

function resetBoard(){
    return {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    }
}

let board = resetBoard();

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark.toUpperCase();
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log('\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');

}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    let valPosition = Number(position);
    if (isNaN(valPosition) || valPosition < 1 || valPosition > 9) {
        console.log("Please enter a valid position (1-9)");
        return false;
    } else if (board[valPosition] !== ' ') {
        console.log("Position is already occupied");
        return false;
    } else {
        return true;
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let count = 0;
    for (let i = 0; i < winCombinations.length; i++) {
      count = 0;
      for (let j = 0; j < winCombinations[i].length; j++) {
        if (board[winCombinations[i][j]] === player) {
          count++;
        }
        if (count === 3) {
          return true;
        }
      }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i in board) {
        if (board[i] === ' ') {
            return false; 
        }
      }
      return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let currentPos = prompt(player + "'s turn, input: ");

    if (validateMove(currentPos) === true){
        markBoard(currentPos,player);
        printBoard();
        if (checkWin(player) === true){
            console.log("Congratulations! " + player + " win!!!");
            return;
        }
        if (checkFull() === true){
            console.log("It's a tie");
            return;
        }
        if (player === 'X'){
            playTurn('O');
        } else {
            playTurn('X');
        }
    } else {
        if (player === 'X'){
            playTurn('X');
        } else {
            playTurn('O');
        }
    }


}

let gameState = true; //initialize game

while(gameState){

board = resetBoard(); //reset board after every game

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false;
let currentTurnPlayer = 'X';

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    winnerIdentified = true;
    // feel free to add logic here if needed, e.g. announcing winner or tie
    

}
let validInput = false;

while (!validInput){
let askGameState = prompt("Do you want a rematch? (Y/N): "); //input to ask user to remake the game
if (askGameState.toUpperCase() === "N"){
    console.log("Thanks for playing!!");
        gameState = false;
        validInput = true;
    }else if (askGameState.toUpperCase() === "Y"){
        gameState = true;
        validInput = true;
    }else{
        console.log("Please enter a valid input (Y/N)")
    }
}

}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
