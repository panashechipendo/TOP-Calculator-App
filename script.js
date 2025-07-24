// Grab needed elements
const digitsCont = document.querySelector(".digitsContainer");
const numbers = document.querySelectorAll(".digit");
const symbols = document.querySelectorAll(".symbol");
const period = document.querySelector(".period");
const equals = document.querySelector(".equals");
const display = document.querySelector(".input-container");
const clear = document.querySelector(".clear");
const text = document.createElement("h2");
const del = document.querySelector(".backspace");

display.appendChild(text);
text.textContent = "";

text.style.marginTop = "10px";

// Turn to array for ease of iteration
const zeroToNine = Array.from(numbers);
const symbolArray = Array.from(symbols);

// Main storage for expression
let expressionParts = [];
let result;

// Initial button states
zeroToNine.forEach((number) => {
  number.disabled = false;
});
symbolArray.forEach((symbol) => {
  symbol.disabled = true;
});
equals.disabled = true;
period.disabled = false;

function add(a, b) {
  return (Number(a) + Number(b)).toFixed(1);
}

function subtract(a, b) {
  return (Number(a) - Number(b)).toFixed(1);
}

function multiply(a, b) {
  return (Number(a) * Number(b)).toFixed(1);
}

function divide(a, b) {
  if (Number(b) == 0) {
    return alert("Yeah no you don't😂");
  }
  return (Number(a) / Number(b)).toFixed(1);
}

function checkForSymbol() {
  let copied = expressionParts.slice();
  let removedEl = copied.pop();
  if (
    removedEl == "+" ||
    removedEl == "-" ||
    removedEl == "*" ||
    removedEl == "/"
  ) {
    return true;
  }
  return false;
}

function checkForPeriod() {
  let copied = expressionParts.slice();
  let removedEl = copied.pop();
  if (removedEl == ".") {
    return true;
  }
  return false;
}

// Main math function to parse expression and pass to relevant function
function evaluate(exp) {
  let result;
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] == "+") {
      result = add(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
    } else if (exp[i] == "-") {
      result = subtract(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
    } else if (exp[i] == "*") {
      result = multiply(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
    } else if (exp[i] == "/") {
      result = divide(exp.slice(0, i).join(""), exp.slice(i + 1).join(""));
    }
  }

  return result;
}

// Add event listeners to all digit buttons
zeroToNine.forEach((number) => {
  number.addEventListener("click", (e) => {
    let digit = e.target.value;

    // Check if previous result present
    if (expressionParts && result) {
      expressionParts.length = 0;
      expressionParts.push(digit);
      text.textContent = digit;
      result = "";
      return;
    }

    if (text.textContent == "0" && digit == "0") {
      return;
    }

    if (text.textContent === "0" && digit !== "0") {
      text.textContent = digit;
      // Update operator array if it was just ["0"]
      if (operator.length === 1 && operator[0] === "0") {
        operator[0] = digit;
      }
      symbolArray.forEach((symbol) => {
        symbol.disabled = false;
      });
      return;
    }

    // Append to text and expression
    text.textContent += digit;
    expressionParts.push(digit);
    symbolArray.forEach((symbol) => {
      symbol.disabled = false;
    });

    // Check whether the last element input is an operator
    if (
      expressionParts.includes("+") ||
      expressionParts.includes("-") ||
      expressionParts.includes("*") ||
      expressionParts.includes("/")
    ) {
      symbolArray.forEach((symbol) => {
        symbol.disabled = true;
      });
      equals.disabled = false;
    }
  });
});

// Handles input of periods
period.addEventListener("click", (e) => {
  let dot = e.target.value;
  let valid = checkForPeriod();
  let valid2 = checkForSymbol();

  if (expressionParts.length == 0 || valid2 || valid) {
    return;
  }

  text.textContent += dot;
  expressionParts.push(dot);
  period.disabled = true;
});

// Event listeners for operators
symbols.forEach((symbol) => {
  symbol.addEventListener("click", (e) => {
    let operator = e.target.value;

    result = "";
    text.textContent += operator;
    expressionParts.push(operator);
    symbolArray.forEach((symbol) => {
      symbol.disabled = true;
    });
    period.disabled = false;
  });
});

// Displays result and evaluates expression
equals.addEventListener("click", () => {
  console.log(evaluate(expressionParts));
  text.textContent = evaluate(expressionParts);
  result = evaluate(expressionParts);
  console.log(result);
  expressionParts.length = 0;
  expressionParts.push(text.textContent);
  symbolArray.forEach((symbol) => {
    symbol.disabled = false;
  });
});

// Clears display and text.textContent
clear.addEventListener("click", () => {
  text.textContent = "";
  expressionParts.length = 0;
});

// Deletes last element from expression
del.addEventListener("click", () => {
  if (expressionParts.length == 0) {
    return;
  }
  let valid = checkForSymbol();
  console.log(valid);
  if (valid) {
    symbolArray.forEach((symbol) => {
      symbol.disabled = false;
    });
  }
  console.log(expressionParts);
  text.textContent = text.textContent.slice(0, -1);
});
