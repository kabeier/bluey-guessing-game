// Game settings
const MAX_GUESSES = 5;
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

// Game state
let secretNumber;
let guessesLeft;

// Page elements
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const guessesLeftDisplay = document.getElementById("guesses-left");
const dialog = document.getElementById("result-dialog");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const resultButton = document.getElementById("result-button");

// Pick a new secret number and reset everything
function startNewGame() {
  secretNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
  guessesLeft = MAX_GUESSES;
  guessesLeftDisplay.textContent = guessesLeft;
  input.value = "";
  showFeedback("", "");
  input.focus();
}

// Show a message under the input ("wrong" = red, "right" = green)
function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = "feedback " + type;
}

// Open the end-of-game pop-up
function showResult(won) {
  if (won) {
    dialog.className = "win";
    resultTitle.textContent = "Hooray! You guessed it!";
    resultMessage.textContent = "The number was " + secretNumber + ". Well done!";
    resultButton.textContent = "Play Again";
  } else {
    dialog.className = "lose";
    resultTitle.textContent = "Oh, biscuits! You ran out of guesses.";
    resultMessage.textContent = "The number was " + secretNumber + ".";
    resultButton.textContent = "Try Again";
  }
  dialog.showModal();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const guess = Number(input.value);

  // Invalid guesses don't use up an attempt
  if (input.value === "" || !Number.isInteger(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
    showFeedback("Please enter a whole number from 1 to 100.", "wrong");
    input.select();
    return;
  }

  guessesLeft--;
  guessesLeftDisplay.textContent = guessesLeft;
  input.value = "";

  if (guess === secretNumber) {
    showFeedback("Correct! You got it!", "right");
    showResult(true);
  } else if (guessesLeft === 0) {
    showFeedback("Out of guesses!", "wrong");
    showResult(false);
  } else if (guess > secretNumber) {
    showFeedback(guess + " is too high! Try a smaller number.", "wrong");
  } else {
    showFeedback(guess + " is too low! Try a bigger number.", "wrong");
  }

  input.focus();
});

// Closing the pop-up (button or Esc key) starts a new game
dialog.addEventListener("close", startNewGame);

startNewGame();
