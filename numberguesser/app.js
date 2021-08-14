'use strict';
// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Valildate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);
    }

    // Check if won
    if (guess === winningNum) {
        // Game over - won

        // // Disable input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set message
        // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');

        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost

            gameOver(false, `GAME OVER, you lost. The correct number was ${winningNum}.`);
            // // Disable input
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'red';
            // // Set message
            // setMessage(`GAME OVER, you lost. The correct number was ${winningNum}.`, 'red');
        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
    }
});

// Game Over
function gameOver(won, msg) {
    let color;

    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg);


    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg
}