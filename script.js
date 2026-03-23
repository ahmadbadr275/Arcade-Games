// --- Game Menu ---
function openGame(gameId) {
    document.querySelectorAll('.game, .menu').forEach(el => el.classList.remove('active'));
    document.getElementById(gameId).classList.add('active');
}

// --- Guess the Number ---
let randomNumber = Math.floor(Math.random() * 100) + 1;
let lives = 10;

function submitGuess() {
    const guessInput = document.getElementById("guessInput");
    const message = document.getElementById("message");
    const livesDisplay = document.getElementById("lives");
    const guess = Number(guessInput.value);

    if (!guess) { message.textContent = "❌ Please enter a number!"; return; }
    if (guess === randomNumber) { message.textContent = "🎉 You guessed it!"; }
    else {
        lives--;
        livesDisplay.textContent = `❤️ Lives: ${lives}`;
        message.textContent = guess < randomNumber ? "⬆️ Too low!" : "⬇️ Too high!";
        if (lives === 0) { message.textContent = `💀 Game over! Number was ${randomNumber}`; }
    }
    guessInput.value = "";
}

function restart() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    lives = 10;
    document.getElementById("message").textContent = "";
    document.getElementById("lives").textContent = `❤️ Lives: ${lives}`;
    document.getElementById("guessInput").value = "";
}

// --- Clicker Game ---
let score = 0;
function clickIt() { 
    score++; 
    document.getElementById("score").textContent = score; 
}
function resetClicker() { 
    score = 0; 
    document.getElementById("score").textContent = score; 
}

// --- Snake Game ---
let snakeCanvas = document.getElementById("snakeCanvas");
let ctx = snakeCanvas.getContext("2d");
let snake = [];
let direction = "RIGHT";
let food = {};
let snakeScore = 0;
let snakeInterval;

function startSnake() {
    snake = [{x: 10, y: 10}];
    direction = "RIGHT";
    snakeScore = 0;
    placeFood();
    clearInterval(snakeInterval);
    snakeInterval = setInterval(updateSnake, 100);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };
}

document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if(e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if(e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if(e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function updateSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    if(direction === "UP") head.y--;
    if(direction === "DOWN") head.y++;
    if(direction === "LEFT") head.x--;
    if(direction === "RIGHT") head.x++;

    // Check collisions
    if(head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        clearInterval(snakeInterval);
        alert("💀 Game Over!");
        return;
    }

    snake.unshift(head);
    if(head.x === food.x && head.y === food.y) {
        snakeScore++;
        document.getElementById("snakeScore").textContent = snakeScore;
        placeFood();
    } else {
        snake.pop();
    }

    drawSnake();
}

function drawSnake() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    ctx.fillStyle = "#0f0";
    snake.forEach(seg => ctx.fillRect(seg.x*20, seg.y*20, 20, 20));

    ctx.fillStyle = "#ff0055";
    ctx.fillRect(food.x*20, food.y*20, 20, 20);
}

// --- Back to Menu ---
function backToMenu() {
    clearInterval(snakeInterval);
    document.querySelectorAll('.game, .menu').forEach(el => el.classList.remove('active'));
    document.getElementById('menu').classList.add('active');
}
