/**
 * Gameboard represent the actual board
 * Gameboard will contain Cells
 */
function GameBoard() {
    const winnigIndexes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    // Gameboard will be 3x3
    const board = [];

    for (let i = 0; i < 9; i++) {
        board.push(Cell());
    }

    function putMark(index, playerMark) {
        if (board[index].getMark() !== "") return;
        board[index].setMark(playerMark);
    }

    function printBoard() {
        console.log(`${board[0].getMark()} | ${board[1].getMark()} | ${board[2].getMark()}`);
        console.log(`${board[3].getMark()} | ${board[4].getMark()} | ${board[5].getMark()}`);
        console.log(`${board[6].getMark()} | ${board[7].getMark()} | ${board[8].getMark()}`);
    }

    function hasEmptyCell() {
        return board.some((cell) => cell.getMark === "");
    }

    return {
        putMark,
        printBoard,
        hasEmptyCell,
    }
}

function Cell() {
    let mark = "";

    function setMark(playerMark) {
        mark = playerMark;
    }

    function getMark() {
        return mark;
    }

    return {
        setMark,
        getMark,
    }
}

function Player() {
    let mark = "";
    let name = "";

    function setMark(playerMark) {
        mark = playerMark;
    }

    function setName(playerName) {
        name = playerName;
    }

    function getName() {
        return name;
    }

    function getMark() {
        return mark;
    }

    return {
        setMark,
        setName,
        getMark,
        getName,
    }
}