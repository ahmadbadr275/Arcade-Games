let secretNumber = Math.floor(Math.random() * 10) + 1;
let lives = 5;

function guess(number) {
    if (lives <= 0) return;

    let message = document.getElementById("message");

    if (number === secretNumber) {
        message.textContent = "🎉 You Win!";
    } else {
        lives--;

        if (lives > 0) {
            if (number < secretNumber) {
                message.textContent = "Too low!";
            } else {
                message.textContent = "Too high!";
            }
        } else {
            message.textContent = "💀 Game Over! Number was " + secretNumber;
        }
    }

    document.getElementById("lives").textContent = "❤️ Lives: " + lives;
}

function restart() {
    secretNumber = Math.floor(Math.random() * 10) + 1;
    lives = 5;

    document.getElementById("message").textContent = "";
    document.getElementById("lives").textContent = "❤️ Lives: 5";
}
