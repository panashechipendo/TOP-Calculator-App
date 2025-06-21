const numbers = document.querySelectorAll(".digit");
const symbols = document.querySelectorAll(".symbol");
const equals = document.querySelector(".equals");
const display = document.querySelector(".input-container");
const text = document.createElement("h3");

const zeroToNine = Array.from(numbers);
const symbolArray = Array.from(symbols);

function appendToInput(event) {
  let item = event.target.value;
  text.textContent += item;
}

let exp = [];
function add(...a) {
  a.reduce((acc, curr) => acc + curr);
}

function subtract(...a) {
  a.reduce((acc, curr) => acc + curr);
}

function multiply(...a) {
  a.reduce((acc, curr) => acc + curr);
}

function divide(...a) {
  a.reduce((acc, curr) => acc * curr);
}

function evaluate(expression) {}

zeroToNine.forEach((number) => {
  number.addEventListener("click", appendToInput);
});
