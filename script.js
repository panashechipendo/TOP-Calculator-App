const numbers = document.querySelectorAll(".digit");
const symbols = document.querySelectorAll(".symbol");
const equals = document.querySelector(".equals");
const display = document.querySelector(".input-container");
const clear = document.querySelector(".clear");
const text = document.createElement("h2");
display.appendChild(text);
text.textContent = "";

const zeroToNine = Array.from(numbers);
const symbolArray = Array.from(symbols);

let expressionParts = [];

// Initial button states
zeroToNine.forEach((number) => {
  number.disabled = false;
});
symbolArray.forEach((symbol) => {
  symbol.disabled = true;
});
equals.disabled = true;

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
  if (Number(b) == 0) {
    return alert("Yeah no you don't😂");
  }
  return Number(a) / Number(b);
}

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

zeroToNine.forEach((number) => {
  number.addEventListener("click", (e) => {
    let digit = e.target.value;

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
    text.textContent += digit;
    expressionParts.push(digit);
    symbolArray.forEach((symbol) => {
      symbol.disabled = false;
    });

    // Check whether the last element input is an operator
    if (
      expressionParts[expressionParts.length - 1] == "+" ||
      expressionParts[expressionParts.length - 1] == "-" ||
      expressionParts[expressionParts.length - 1] == "*" ||
      expressionParts[expressionParts.length - 1] == "/"
    ) {
      symbolArray.forEach((symbol) => {
        symbol.disabled = true;
      });
    }
    if (
      (expressionParts.includes("+") &&
        expressionParts[expressionParts.length - 1] != "+") ||
      (expressionParts.includes("-") &&
        expressionParts[expressionParts.length - 1] != "-") ||
      (expressionParts.includes("*") &&
        expressionParts[expressionParts.length - 1] != "*") ||
      (expressionParts.includes("/") &&
        expressionParts[expressionParts.length - 1] != "/")
    ) {
      symbolArray.forEach((symbol) => {
        symbol.disabled = true;
      });
      equals.disabled = false;
    }
  });
});

symbols.forEach((symbol) => {
  symbol.addEventListener("click", (e) => {
    let operator = e.target.value;

    text.textContent += operator;
    expressionParts.push(operator);
    symbolArray.forEach((symbol) => {
      symbol.disabled = true;
    });
  });
});

equals.addEventListener("click", () => {
  console.log(evaluate(expressionParts));
  text.textContent = evaluate(expressionParts);
  expressionParts.length = 0;
  expressionParts.push(text.textContent);
  symbolArray.forEach((symbol) => {
    symbol.disabled = false;
  });
});

clear.addEventListener("click", () => {
  text.textContent = "";
  expressionParts.length = 0;
});
