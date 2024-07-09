let board;

let currentPlayer;

let gameActive;

const winningMessage = () => `Player ${currentPlayer} has won!`;

const drawMessage = () => `Game ended in a draw!`;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const cells = document.querySelectorAll('.cell');

const resetButton = document.getElementById('reset');

const messageDisplay = document.getElementById('message');

document.addEventListener('DOMContentLoaded', startGame);

resetButton.addEventListener('click', startGame);

function startGame() {

    board = ['', '', '', '', '', '', '', '', ''];

    currentPlayer = 'X';

    gameActive = true;

    messageDisplay.innerText = currentPlayerTurn();

    cells.forEach(cell => {

        cell.innerText = '';

        cell.classList.remove('winning-cell');

        cell.addEventListener('click', handleCellClick);

    });

}

function handleCellClick(event) {

    const clickedCell = event.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {

        return;

    }

    handleCellPlayed(clickedCell, clickedCellIndex);

    handleResultValidation();

}

function handleCellPlayed(clickedCell, clickedCellIndex) {

    board[clickedCellIndex] = currentPlayer;

    clickedCell.innerText = currentPlayer;

}

function handleResultValidation() {

    const winningConditions = [

        [0, 1, 2],

        [3, 4, 5],

        [6, 7, 8],

        [0, 3, 6],

        [1, 4, 7],

        [2, 5, 8],

        [0, 4, 8],

        [2, 4, 6]

    ];

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {

        const winCondition = winningConditions[i];

        let a = board[winCondition[0]];

        let b = board[winCondition[1]];

        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {

            continue;

        }

        if (a === b && b === c) {

            roundWon = true;

            winCondition.forEach(index => cells[index].classList.add('winning-cell'));

            break;

        }

    }

    if (roundWon) {

        messageDisplay.innerText = winningMessage();

        gameActive = false;

        return;

    }

    let roundDraw = !board.includes('');

    if (roundDraw) {

        messageDisplay.innerText = drawMessage();

        gameActive = false;

        return;

    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    messageDisplay.innerText = currentPlayerTurn();

}