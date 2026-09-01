// 2: Connect Event to Logic
const inputElement = document.querySelector("#input-number");
const buttonElement = document.querySelector("#btn-enter");

// 4: Connect Element to Display
const displayElement = document.querySelector("#display");

// 3: Logic function
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

// console.log(fizzBuzzGame(15));

/* buttonElement.addEventListener("click", function () {
  console.log("Button Clicked!");
}); */

// Event binding - Event Listener
buttonElement.addEventListener("click", handleFizzBuzz);

//Keyboard Event : Trigger when pressing Enter
inputElement.addEventListener("keydown", handleEnterKeydown);

// Separate the logic of the operation into function : DRY principle, Controller / Event Handler
function handleFizzBuzz() {
  const userNum = Number(inputElement.value);
  // Validation & Error Handling : Guard clause
  if (!userNum || userNum <= 0) {
    displayElement.innerHTML = `<p style="color: red;">Please enter a number greater than 0</p>`;
    return;
  }
  if (userNum > 500) {
    displayElement.innerHTML = `<p style="color: red;">Please enter a number less than 500</p>`;
    return;
  }

  // If data passes the check, Start and display normally
  const gameResult = fizzBuzzGame(userNum);

  // Reset display
  displayElement.innerHTML = "";

  let htmlContent = "";
  // DOM Update (Render) - add elements <p> to display
  gameResult.forEach((item) => {
    // Dynamic Class Binding
    let className = "";
    if (item === "Fizz") {
      className = "fizz";
    } else if (item === "Buzz") {
      className = "buzz";
    } else if (item === "FizzBuzz") {
      className = "fizzbuzz";
    }
    // Combine the text into memory first
    htmlContent += `<p class="${className}">${item}</p>`;

    // Auto Clear & Focus
    inputElement.value = "";
    inputElement.focus();
  });

  // After the loop ends, draw it all on the page at once
  displayElement.innerHTML = htmlContent;

  console.log(gameResult);
}

// Keyboard event handler
function handleEnterKeydown(event) {
  // console.log(event.key);
  if (event.key === "Enter") {
    handleFizzBuzz();
  }
}
