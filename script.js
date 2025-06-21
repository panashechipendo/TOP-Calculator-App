const numbers = document.querySelectorAll(".digit");
const symbols = document.querySelectorAll(".symbol");
const equals = document.querySelector(".equals");
const display = document.querySelector(".input-container");
const text = document.createElement("h2");
display.appendChild(text);
text.textContent = "";

const zeroToNine = Array.from(numbers);
const symbolArray = Array.from(symbols);

let operand1 = [];
let operand2 = [];
let operator = [];

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

zeroToNine.forEach((number) => {
  number.addEventListener("click", (e) => {
    let item = e.target.value;
    text.textContent += item;
    console.log(item);
  });
});

symbols.forEach((symbol) => {
  symbol.addEventListener("click", (e) => {
    let item = e.target.value;
    console.log(typeof item);
    text.textContent += item;
    operator.push(item);
  });
});

function evaluate(exp) {
  let result;
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] == "+") {
      result = add(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
      text.textContent = result;
    } else if (exp[i] == "-") {
      result = subtract(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
      text.textContent = result;
    } else if (exp[i] == "*") {
      result = multiply(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
      text.textContent = result;
    } else if (exp[i] == "/") {
      result = divide(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
      text.textContent = result;
    }
  }

  return result;
}

console.log(evaluate(["1", "2", "-", "1", "2"]));
