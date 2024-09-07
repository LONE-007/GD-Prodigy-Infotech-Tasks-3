const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

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

const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = `Player ${currentPlayer} wins!`;
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'green';
            isGameActive = false;
            return true;
        }
    }
    if (!board.includes('')) {
        statusText.innerText = 'It\'s a draw!';
        isGameActive = false;
        return true;
    }
    return false;
};

const cellClickHandler = (e) => {
    const cellIndex = e.target.getAttribute('data-index');

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (!checkWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `Player ${currentPlayer}'s turn`;
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.innerText = `Player X's turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = 'lightblue';
    });
};

cells.forEach(cell => cell.addEventListener('click', cellClickHandler));
restartButton.addEventListener('click', restartGame);
