const prompt = require('prompt-sync')({sigint: true});

// Update this gameboard by giving better naming 
let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// update the gameboard with the user input
function markBoard(position, mark) {
    let pos_num = Number(position)
    board[pos_num] = mark
    return 
}

// print the game board as described at the top of this code skeleton
function printBoard() {
    let board2 = Object.assign({}, board)
    let arr = Object.keys(board)
    pos = 0
        while(pos < 10){
            if (board2[pos] == " "){
                board2[pos] = arr [pos-1]
            }
            pos++
        }
        for (i=1;i<9;i=i+3){
            console.log(board2[i] + " | " + board2[i+1] + " | " + board2[i+2])
            console.log("---------")
        }
}


// check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    let pos_num2 = Number(position) //logic wrong non number input
    if (board[pos_num2] == " "){
        return true
    } else if (board[pos_num2] == "X" || board[pos_num2] == "O" ){
        console.log("Space is occupied")
        return false
    } else if (pos_num2 > 9 || pos_num2){
        console.log("Position is out of bound")
        return false
    } else {
        console.log("Wrong Input")
        return false
    }
}

// list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let com of winCombinations){
        if (board[com[0]] === player && board[com[1]] === player && board[com[2]] === player){
          return true      
        }
      }
      return false
}

// implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    let i = 1
    while (i <= 9){
        if(board[i] == " "){
        return false }
    i++
    }
    return true
}

// the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
let input
function playTurn(player) {
        do{
        input = prompt(player + "'s turn, input:")
        console.log("\n")
        }while(validateMove(input) === false)
    markBoard(input,player)
    printBoard()
        
}

let winnerIdentified = false
let currentTurnPlayer = 'X'
let repeat = "Y"

while (repeat === "Y" || repeat === "y"){
// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

    while (!winnerIdentified){
        playTurn(currentTurnPlayer)
        if (checkWin(currentTurnPlayer) == true){
            console.log(currentTurnPlayer + " had won!!")
            winnerIdentified = true
        } else if (checkFull() == true){
            winnerIdentified = true
            console.log("Is a TIE")
        }
        if (currentTurnPlayer === 'X'){
            currentTurnPlayer = "O"
        } else if (currentTurnPlayer === 'O'){
            currentTurnPlayer = "X"
        }
    }
    repeat = prompt("Do you want to repeat the game? (Y/N)")
    if (repeat === "Y" || repeat === "y"){
    winnerIdentified = false
        for (i=1;i<=9;i++){
        markBoard(i,' ')
        }
    }
}

console.log("Thank you!")

