const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');


let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

function markBoard(position, mark) {
    let pos_num = Number(position)
    board[pos_num] = mark
    return 
}

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


function validateMove(position) {
let pos_num2 = Number(position) 
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


function checkWin(player) {
    for (let com of winCombinations){
      if (board[com[0]] === player && board[com[1]] === player && board[com[2]] === player){
        console.log(player + " had won!!")
        return true      
      }
    }
    return false
}

function checkFull() {
let i = 1
    while (i <= 9){
        if(board[i] == " "){
        return false }
    i++
    }
    return true
}


// Test validateMove()
assert.strictEqual(validateMove(0), false, "validateMove() didn't work as expected with input : 0");
assert.strictEqual(validateMove(10), false, "validateMove() didn't work as expected with input : 10");
assert.strictEqual(validateMove('Hello'), false, "validateMove() didn't work as expected with input : 'Hello'");
assert.strictEqual(validateMove('1'), true, "validateMove() didn't work as expected with input : 1");
assert.strictEqual(validateMove('5'), true, "validateMove() didn't work as expected with input : 5");
assert.strictEqual(validateMove('9'), true, "validateMove() didn't work as expected with input : 9");

let tsetBoard = {
    1: 'X', 2: 'O', 3: 'X',
    4: 'O', 5: 'X', 6: 'O',
    7: ' ', 8: ' ', 9: ' '
};

// Test markBoard()
markBoard(1, 'X');
markBoard(2, 'O');
markBoard(3, 'X');
markBoard(4, 'O');
markBoard(5, 'X');
markBoard(6, 'O');

assert.deepStrictEqual(board, tsetBoard, "markBoard() didn't work as expected");

assert.strictEqual(validateMove('1'), false, "validateMove() didn't work as expected with duplicated input : 1");

// Test checkWin()
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");
tsetBoard[7] = 'X'
markBoard(7, 'X');
assert.deepStrictEqual(board, tsetBoard, "markBoard() didn't work as expected with input (7, 'X')");
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");


board = {
    1: 'X', 2: ' ', 3: ' ',
    4: 'O', 5: 'X', 6: ' ',
    7: 'O', 8: ' ', 9: 'X'
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'O', 2: ' ', 3: ' ',
    4: 'X', 5: 'O', 6: ' ',
    7: 'X', 8: 'X', 9: 'O'
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");

board = {
    1: 'X', 2: 'O', 3: 'O',
    4: 'X', 5: ' ', 6: ' ',
    7: 'X', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'X', 2: 'O', 3: 'X',
    4: 'X', 5: 'O', 6: ' ',
    7: ' ', 8: 'O', 9: ' '
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");

board = {
    1: 'X', 2: 'X', 3: 'X',
    4: 'O', 5: 'O', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'X', 2: 'X', 3: ' ',
    4: 'O', 5: 'O', 6: 'O',
    7: 'X', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");


// Test checkFull()
assert.strictEqual(checkFull(), false, "checkFull() didn't work as expected");
board = {
    1: 'O', 2: 'X', 3: 'O',
    4: 'O', 5: 'X', 6: 'X',
    7: 'X', 8: 'O', 9: 'X'
}
assert.strictEqual(checkFull(), true, "checkFull() didn't work as expected");

console.log("All tests passed! Congratulations!");