// 2: Connect Event to Logic
const inputElement = document.querySelector("#input-number");
const buttonElement = document.querySelector("#btn-enter");

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

// Event binding
buttonElement.addEventListener("click", function () {
  const userNum = Number(inputElement.value);
  const gameResult = fizzBuzzGame(userNum);

  console.log(gameResult);
});
