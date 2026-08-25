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
buttonElement.addEventListener("click", function () {
  const userNum = Number(inputElement.value);
  const gameResult = fizzBuzzGame(userNum);

  // Reset display
  displayElement.innerHTML = "";

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
    displayElement.innerHTML += `<p class="${className}">${item}</p>`;
  });

  console.log(gameResult);
});
