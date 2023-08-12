// Initialize variables to store numbers, operator, and display value
let firstNumber = 0; 
let secondNumber = 0;
let operator = "";
let displayValue = 0;
let decimalPressed = false; // variable to track decimal point

// Map special keys with their code equivalents
const specialKeys = {
  "Backspace": "\u232B",
  "Delete": "Clear",
  "Enter": "=",
  "m": "+/-",
  "*": "x" 
};

// Functions for basic arithmetic operations
const add = function (firstNum, secondNum) {
  return firstNum + secondNum;
};

const subtract = function (firstNum, secondNum) {
  return firstNum - secondNum;
};

const multiply = function (firstNum, secondNum) {
  return firstNum * secondNum;
};

const divide = function (firstNum, secondNum) {
  if (secondNum === 0) {
    return "Error"; // Handle division by zero
  }
  return firstNum / secondNum;
};

function operate(firstNum, secondNum, operator, decimalPlaces) {
  let result;

  if (operator === "+") {
    result = add(firstNum, secondNum);
  } else if (operator === "-") {
    result = subtract(firstNum, secondNum);
  } else if (operator === "x" || operator === "*") {
    result = multiply(firstNum, secondNum);
  } else if (operator === "/") {
    result = divide(firstNum, secondNum);
  }

  if (typeof result === "number") {
    return result.toFixed(decimalPlaces); // Round the result to the specified decimal places
  } else {
    return result; // Return "Error" or other non-numeric values unchanged
  }
}

// Set up event listeners for button clicks
// Get all buttons
const buttons = document.querySelectorAll('.buttons button'); 
// Display for numbers
const calculatorDisplay = document.getElementById('calculatorDisplay'); 
// Display for operations
const operationDisplay = document.getElementById('operationDisplay');

// Set up event listeners for keydown and keyup events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Function to handle button clicks
function handleButtonClick() {
  const buttonText = this.textContent;
  handleInput(buttonText);
}

// Function to handle keydown event
function handleKeyDown(event) {
  const key = event.key;
  highlightKey(specialKeys[key] || key, true); // Highlight pressed key
  handleInput(specialKeys[key] || key);
}

// Function to handle keyup event
function handleKeyUp(event) {
  const key = event.key;
  highlightKey(specialKeys[key] || key, false); // Deactivate highlight 
}

// Function to highlight or unhighlight a key
function highlightKey(key, isHighlighted) {
  const button = getButtonByKey(key);
  if (button) {
    if (isHighlighted) {
      button.classList.add('highlighted');
    } else {
      button.classList.remove('highlighted');
    }
  }
}

// Function to get the button corresponding to a key
function getButtonByKey(key) {
  return [...buttons].find(button => button.textContent === key);
}

// Function to handle both button clicks and keyboard input
function handleInput(input) {
  // Handling number buttons
  if (input >= '0' && input <= '9') {
    if (operator === "") {
      if (decimalPressed) {
        firstNumber = parseFloat(calculatorDisplay.textContent + '.' + input);
        decimalPressed = false;
      } else {
        firstNumber = parseFloat(calculatorDisplay.textContent + input);
      }
      displayValue = firstNumber;
    } else {
      if (decimalPressed) {
        secondNumber = parseFloat(calculatorDisplay.textContent + '.' + input);
        decimalPressed = false;
      } else {
        secondNumber = parseFloat(calculatorDisplay.textContent + input);
      }
      displayValue = secondNumber;
    }
  }

  // Handling the decimal button
  else if (input === ".") {
    decimalPressed = true;
  }

  // Handling operator buttons
  else if (input === "+" || input === "-" || input === "x" || input === "*" || input === "/") {
    operator = input;
    displayValue = 0;
    operationDisplay.textContent = firstNumber + " " + operator;
  }

  // Handling the equal button
  else if (input === "=" || input === "Enter") {
    if (operator !== "" && secondNumber !== 0) {
      const result = operate(firstNumber, secondNumber, operator, 4); // Specify the number of decimal places
      displayValue = parseFloat(result); // Parse the rounded result back to a float
      firstNumber = parseFloat(result); // Update the first number as well
      secondNumber = 0;
      operator = "";
      operationDisplay.textContent = "";
    }
  }

  // Handling the Clear button 
  else if (input === "Clear" || input === "Delete") {
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    displayValue = 0;
    operationDisplay.textContent = "";
  }

  // Handling the backspace button 
  else if (input === "\u232B" || input === "Backspace") {
    if (operator === "") {
      const stringValue = firstNumber.toString();
      if (stringValue.length > 1) {
        firstNumber = parseFloat(stringValue.slice(0, -1));
        displayValue = firstNumber;
      } else {
        firstNumber = 0;
        displayValue = 0;
      }
    } else {
      const stringValue = secondNumber.toString();
      if (stringValue.length > 1) {
        secondNumber = parseFloat(stringValue.slice(0, -1));
        displayValue = secondNumber;
      } else {
        secondNumber = 0;
        displayValue = 0;
      }
    }
  }

  // Handling the +/- button ("m" for minus on the keyboard)
  else if (input === "+/-" || input === "m") {
    if (operator === "") {
      firstNumber = -firstNumber;
      displayValue = firstNumber;
    } else {
      secondNumber = -secondNumber;
      displayValue = secondNumber;
    }
  }

  calculatorDisplay.textContent = displayValue; // Update the displayed value
}

// Add event listener to footer icon
document.querySelector(".icon").addEventListener("click", function() {
  window.open("https://github.com/Laura202301/calculator", "_blank");
});