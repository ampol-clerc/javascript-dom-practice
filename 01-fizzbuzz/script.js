/* 1. DOM Elements Selection */
// Connect Event to Logic
const inputElement = document.querySelector("#input-number");
const buttonElement = document.querySelector("#btn-enter");
const clearButtonElement = document.querySelector("#btn-clear");
const dashboardElement = document.querySelector("#dashboard");
const displayElement = document.querySelector("#display");

// Global State
let currentGameResults = [];

/* 2. Business Logic */
// Logic function
function fizzBuzzGame(number) {
  const result = [];

  for (let i = 1; i <= number; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i);
    }
  }
  return result;
}

/* 3. UI / Render Functions */
// Render function game cards
function renderGameCards(results) {
  let htmlContent = "";
  // Add elements <p> to display
  results.forEach((item) => {
    // Dynamic Class Binding
    let className = "";
    if (item === "Fizz") {
      className = "fizz";
    } else if (item === "Buzz") {
      className = "buzz";
    } else if (item === "FizzBuzz") {
      className = "fizzbuzz";
    }
    // Combine the texts
    htmlContent += `<p class="card ${className}">${item}</p>`;
  });

  // DOM update: after the loop ends, draw game results all on the page at once
  displayElement.innerHTML = htmlContent;
}

// Render function counting statistics
function updateDashboard(gameResult) {
  let fizzCount = 0;
  let buzzCount = 0;
  let fizzBuzzCount = 0;
  let numbersCount = 0;

  gameResult.forEach((item) => {
    if (item === "Fizz") fizzCount++;
    else if (item === "Buzz") buzzCount++;
    else if (item === "FizzBuzz") fizzBuzzCount++;
    else numbersCount++;
  });

  // DOM update: rendering statistics
  dashboardElement.innerHTML = `
    <div class="stat-badge stat-fizz">Fizz : <strong>${fizzCount}</strong></div>
    <div class="stat-badge stat-buzz">Buzz : <strong>${buzzCount}</strong></div>
    <div class="stat-badge stat-fizzbuzz">FizzBuzz : <strong>${fizzBuzzCount}</strong></div>
    <div class="stat-badge stat-numbers">Numbers : <strong>${numbersCount}</strong></div>
    `;
}

/* 4. Controllers & Handlers */
// Controller / Event Handler: Manages the game flow (Validation -> Calculation -> Rendering)
function handleFizzBuzz() {
  const userNum = Number(inputElement.value);
  // Validation & error handling: Guard clause
  if (!userNum || userNum <= 0) {
    alert("Please enter a number greater than 0");
    inputElement.value = "";
    inputElement.focus();
    return;
  }
  if (userNum > 500) {
    alert("Please enter a number less than 500");
    inputElement.value = "";
    inputElement.focus();
    return;
  }

  // Calculation: If data passes the check, Start and display normally
  currentGameResults = fizzBuzzGame(userNum);

  // Rendering Game Cards
  // Rendering Game Results Statistics
  renderGameCards(currentGameResults);
  updateDashboard(currentGameResults);

  // Auto clear & focus
  inputElement.value = "";
  inputElement.focus();
}

// Controller for clear
function handleClear() {
  inputElement.value = "";
  displayElement.innerHTML = "";
  inputElement.focus();
  dashboardElement.innerHTML = "";
  currentGameResults = [];
}

// Keyboard event handler
function handleEnterKeydown(event) {
  if (event.key === "Enter") {
    handleFizzBuzz();
  }
}

/* 5. Event Listeners */
buttonElement.addEventListener("click", handleFizzBuzz);
clearButtonElement.addEventListener("click", handleClear);
// Keyboard event: Trigger when pressing Enter
inputElement.addEventListener("keydown", handleEnterKeydown);
