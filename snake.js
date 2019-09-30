
function enterKey(event) {
    // Update direction depending on key hit
    switch (event.key) {
        case 'ArrowUp': ((snakeDirection != 'Down' && (!pressed)) ? snakeDirection = 'Up' : snakeDirection = 'Down'); break;
        case 'ArrowDown': ((snakeDirection != 'Up' && (!pressed))? snakeDirection = 'Down' : snakeDirection = 'Up'); break;
        case 'ArrowLeft': ((snakeDirection != 'Right' && (!pressed))? snakeDirection = 'Left' : snakeDirection = 'Right'); break;
        case 'ArrowRight': ((snakeDirection != 'Left' && (!pressed))? snakeDirection = 'Right' : snakeDirection = 'Left'); break;
        default: break;
    }
    pressed = 1;
    // This prevents the arrow keys from scrolling the window
    event.preventDefault();
}

function placeApple() {
    // A random coordinate for the apple
    let appleX;
    let appleY;
    do {
        appleX = Math.floor(Math.random() * boardWidth);
        appleY = Math.floor(Math.random() * boardHeight);
    }while(board[appleY][appleX].snake > 0 || (board[appleY][appleX].apple > 0));
    board[appleY][appleX].apple = 1;
}

function setTime(intime) {
    time = intime;
}

const board = [];
const boardWidth = 30, boardHeight = 20;
const boardElement = document.getElementById('board');

let snakeX;
let snakeY;
let snakeDirection;
let snakeLength;
let points;
let pressed;
let time = 200;
let have_eaten = 0;

function initGame() {
    for (let y = 0; y < boardHeight; ++y) {
        let row = [];
        for (let x = 0; x < boardWidth; ++x) {
            let cell = {
                snake: 0
            };
            cell.element = document.createElement('div');
            boardElement.appendChild(cell.element);
            row.push(cell);
        }
        board.push(row);
    }
    startGame();
}

function startGame() {
    // Default position for the snake in the middle of the board.
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    snakeLength = 5;
    snakeDirection = 'Up';
    points = 0;
    // Clear the board
    for (let y = 0; y < boardHeight; ++y) {
        for (let x = 0; x < boardWidth; ++x) {
            board[y][x].snake = 0;
            board[y][x].apple = 0;
        }
    }
    // Set the center of the board to contain a snake
    board[snakeY][snakeX].snake = snakeLength-1;
    board[snakeY][snakeX].element.className = "snake";
    setTimeout(gameLoop, time);
    placeApple();
}

function gameLoop() {
    // Update position depending on which direction the snake is moving.
    switch (snakeDirection) {
        case 'Up':    snakeY--; break;
        case 'Down':  snakeY++; break;
        case 'Left':  snakeX--; break;
        case 'Right': snakeX++; break;
    }
    pressed = 0;
    // Check for walls, and restart if we collide with any
    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
        startGame();
        return;
    }
    // Collect apples
    if (board[snakeY][snakeX].apple == 1) {
        snakeLength++;
        points++;
        have_eaten = 1;
        board[snakeY][snakeX].apple = 0;
        placeApple()
    }
    // Tail collision
    if (board[snakeY][snakeX].snake > 0) {
        startGame();
        return;
    }
    // Update the board at the new snake position
    board[snakeY][snakeX].snake = snakeLength;
    // Loop over the entire board, and update every cell
    for (let y = 0; y < boardHeight; ++y) {
        for (let x = 0; x < boardWidth; ++x) {
            let cell = board[y][x];
            if (cell.snake) {
                cell.element.className = 'snake';
                if(!have_eaten) {
                    cell.snake -= 1;
                }
            }
            else if(cell.apple){
                cell.element.className = "apple";
            }
            else{
                cell.element.className = '';
            }
        }
    }
    have_eaten = 0;
    document.getElementById("points").innerHTML = points;
    // This function calls itself, with a timeout of 1000 milliseconds
    setTimeout(gameLoop, time);
}
