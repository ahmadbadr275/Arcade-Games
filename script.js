// Menu
const games = ["guess", "clicker", "snake"];
function openGame(id) {
    games.concat("menu").forEach(g => document.getElementById(g).classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// Back buttons
document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", () => {
    clearInterval(snakeInterval);
    openGame("menu");
}));

// --- Guess the Number ---
let randomNumber = Math.floor(Math.random() * 100) + 1;
let lives = 10;
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const restartGuess = document.getElementById("restartGuess");

guessBtn.addEventListener("click", submitGuess);
restartGuess.addEventListener("click", restartGuessGame);

function submitGuess() {
    const guess = Number(guessInput.value);
    if (!guess) { message.textContent = "❌ Enter a number!"; return; }
    if (guess === randomNumber) { message.textContent = "🎉 You guessed it!"; }
    else {
        lives--;
        livesDisplay.textContent = `❤️ Lives: ${lives}`;
        message.textContent = guess < randomNumber ? "⬆️ Too low!" : "⬇️ Too high!";
        if (lives === 0) message.textContent = `💀 Game over! Number was ${randomNumber}`;
    }
    guessInput.value = "";
}
function restartGuessGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    lives = 10;
    message.textContent = "";
    livesDisplay.textContent = `❤️ Lives: ${lives}`;
    guessInput.value = "";
}

// --- Clicker ---
let score = 0;
const clickButton = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");
const restartClicker = document.getElementById("restartClicker");

clickButton.addEventListener("click", () => { score++; scoreDisplay.textContent = score; });
restartClicker.addEventListener("click", () => { score = 0; scoreDisplay.textContent = score; });

// --- Snake ---
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const startSnakeBtn = document.getElementById("startSnake");
const snakeScoreDisplay = document.getElementById("snakeScore");

let snake = [];
let direction = "RIGHT";
let food = {};
let snakeScore = 0;
let snakeInterval;

// Start Snake
startSnakeBtn.addEventListener("click", startSnake);

// Snake controls
document.addEventListener("keydown", e => {
    if (!document.getElementById("snake").classList.contains("active")) return;
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function startSnake() {
    snake = [{x: 10, y: 10}];
    direction = "RIGHT";
    snakeScore = 0;
    snakeScoreDisplay.textContent = snakeScore;
    placeFood();
    clearInterval(snakeInterval);
    snakeInterval = setInterval(updateSnake, 120);
}

function placeFood() {
    food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
}

function updateSnake() {
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        clearInterval(snakeInterval);
        alert("💀 Game Over!");
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        snakeScore++;
        snakeScoreDisplay.textContent = snakeScore;
        placeFood();
    } else snake.pop();

    drawSnake();
}

function drawSnake() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    snake.forEach(seg => ctx.fillRect(seg.x*20, seg.y*20, 20, 20));

    ctx.fillStyle = "#ff0055";
    ctx.fillRect(food.x*20, food.y*20, 20, 20);
}
