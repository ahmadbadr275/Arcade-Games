let secretNumber = Math.floor(Math.random() * 100) + 1;
let lives = 10;

function submitGuess() {
    let input = document.getElementById("guessInput");
    let number = Number(input.value);
    let message = document.getElementById("message");

    if (number < 1 || number > 100) {
        message.textContent = "⚠ Enter a number between 1 and 100!";
        shake();
        return;
    }

    if (lives <= 0) return;

    if (number === secretNumber) {
        message.textContent = "🎉 YOU WIN!";
        glow();
    } else {
        lives--;

        let diff = Math.abs(number - secretNumber);

        if (lives > 0) {
            if (diff <= 5) {
                message.textContent = "🔥 VERY CLOSE!";
            } else if (number < secretNumber) {
                message.textContent = "📉 TOO LOW!";
            } else {
                message.textContent = "📈 TOO HIGH!";
            }
            shake();
        } else {
            message.textContent = "💀 GAME OVER! Number was " + secretNumber;
        }
    }

    document.getElementById("lives").textContent = "❤️ Lives: " + lives;
    input.value = "";
}

function restart() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    lives = 10;

    document.getElementById("message").textContent = "";
    document.getElementById("lives").textContent = "❤️ Lives: 10";
}

/* ✨ Effects */
function shake() {
    let game = document.querySelector(".game");
    game.style.transform = "translateX(5px)";
    setTimeout(() => game.style.transform = "translateX(-5px)", 50);
    setTimeout(() => game.style.transform = "translateX(0)", 100);
}

function glow() {
    let game = document.querySelector(".game");
    game.style.boxShadow = "0 0 30px #00ff00";
}
