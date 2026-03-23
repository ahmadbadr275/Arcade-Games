// --- Snake Game ---
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const startSnakeBtn = document.getElementById("startSnake");
const snakeScoreDisplay = document.getElementById("snakeScore");

let snake = [];
let direction = "RIGHT";
let food = {};
let snakeScore = 0;
let snakeInterval;
const gridSize = 20; // size of snake segments
const canvasSize = 400; // canvas width/height

startSnakeBtn.onclick = startSnake;

// Snake controls
document.addEventListener("keydown", e => {
    if (!document.getElementById("snake").classList.contains("active")) return;
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function startSnake() {
    snake = [{x: 10, y: 10}]; // starting position
    direction = "RIGHT";
    snakeScore = 0;
    snakeScoreDisplay.textContent = snakeScore;
    placeFood();
    clearInterval(snakeInterval);
    snakeInterval = setInterval(updateSnake, 150); // game speed
    drawSnake(); // initial draw
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)),
        y: Math.floor(Math.random() * (canvasSize / gridSize))
    };
}

function updateSnake() {
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    // collision detection
    if (
        head.x < 0 || head.x >= canvasSize / gridSize ||
        head.y < 0 || head.y >= canvasSize / gridSize ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
        clearInterval(snakeInterval);
        alert("💀 Game Over!");
        return;
    }

    snake.unshift(head);

    // eat food
    if (head.x === food.x && head.y === food.y) {
        snakeScore++;
        snakeScoreDisplay.textContent = snakeScore;
        placeFood();
    } else {
        snake.pop();
    }

    drawSnake();
}

function drawSnake() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    ctx.fillStyle = "#0f0";
    snake.forEach(seg => ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize, gridSize));

    // draw food
    ctx.fillStyle = "#ff0055";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
