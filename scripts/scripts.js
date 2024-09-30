/**
 * Gameboard represent the actual board
 * Gameboard will contain Cells -> Cells will contain marks X/O
 * @returns GameBoard object
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
        if (board[index].getMark() !== "") return true;
        board[index].setMark(playerMark);
    }

    function printBoard() {
        console.log(`${board[0].getMark()} | ${board[1].getMark()} | ${board[2].getMark()}`);
        console.log(`${board[3].getMark()} | ${board[4].getMark()} | ${board[5].getMark()}`);
        console.log(`${board[6].getMark()} | ${board[7].getMark()} | ${board[8].getMark()}`);
    }

    function checkEmptyCell() {
        return board.some( cell => cell.getMark() === "");
    }

    function checkWon() {
        let ended = false;

        winnigIndexes.forEach(winningArr => {
            const firstMark = board[winningArr[0]];
            const secondMark = board[winningArr[1]];
            const thirdMark = board[winningArr[2]];
            
            if (firstMark.getMark() !== "" 
                && firstMark.getMark() === secondMark.getMark() 
                && firstMark.getMark() === thirdMark.getMark()) ended = true;
        });

        return ended;
    }

    function getBoard() {
        return board;
    }

    return {
        putMark,
        printBoard,
        checkEmptyCell,
        checkWon,
        getBoard,
    }
}

/**
 * A Cell represents a place where players can put their marks
 * @returns Cell object
 */
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

/**
 * A player will contain a certain mark and name for displaying
 * @returns Player object
 */
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

/**
 * GameController controls the flow of the game
 * @return GameController object 
 */
function GameController() {
    const gameBoard = GameBoard();
    const player1 = Player();
    const player2 = Player();
    let gameEnded = false;

    player1.setMark("X");
    player1.setName(`Player 1: ${player1.getMark()}`);

    player2.setMark("0");
    player2.setName(`Player 2: ${player2.getMark()}`);

    const players = [];
    players.push(player1, player2);

    let activePlayer = players[0];

    function switchPlayer() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function printNewRound() {
        gameBoard.printBoard();
        console.log(`In Turn: ${getActivePlayer().getName()}`);
    }

    function hasEnded() {
        return gameEnded;
    }

    function playRound(index) {
        if (gameBoard.putMark(index, getActivePlayer().getMark())) {
            console.log("This place is already occupied!");
            return;
        }

        if (gameEnded) {
            console.log("Game already ended!");
            return;
        }

        gameBoard.putMark(index, getActivePlayer().getMark());

        if (gameBoard.checkWon() || !(gameBoard.checkEmptyCell())) {
            gameBoard.printBoard();
            console.log(`${getActivePlayer().getName()} has won the game!`);
            gameEnded = true;
            return;
        }

        switchPlayer();
        printNewRound();
    }

    printNewRound();

    return {
        getActivePlayer,
        playRound,
        hasEnded,
        getBoard: gameBoard.getBoard,
    }
}

/**
 * 
 */
function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector(".game-board");

    function updateScreen() {
        boardDiv.textContent = "";

        const currentBoard = game.getBoard();
        const currentPlayer = game.getActivePlayer();

        currentBoard.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");

            cellButton.dataset.index = index;
            cellButton.textContent = cell.getMark();

            boardDiv.appendChild(cellButton);
        });

        if (game.hasEnded()) {
            document.querySelectorAll("button").forEach(button => button.disabled = true);
        }
    }

    boardDiv.addEventListener("click", event => {
        const clickedCell = event.target.dataset.index;

        game.playRound(clickedCell);
        updateScreen();
    });

    updateScreen();
}

ScreenController();