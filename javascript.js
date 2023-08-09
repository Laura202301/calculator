// Initialize variables to store numbers, operator, and display value
let firstNumber = 0; 
let secondNumber = 0;
let operator = "";
let displayValue = 0;
let decimalPressed = false; // variable to track decimal point

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

// Function to perform the selected operation
function operate(firstNum, secondNum, operator) {
  if (operator === "+") {
    return add(firstNum, secondNum);
  } else if (operator === "-") {
    return subtract(firstNum, secondNum);
  } else if (operator === "x") {
    return multiply(firstNum, secondNum);
  } else if (operator === "/") {
    return divide(firstNum, secondNum);
  }
}

// Set up event listeners for button clicks
const buttons = document.querySelectorAll('.buttons button'); // Get all buttons
const calculatorDisplay = document.getElementById('calculatorDisplay'); // Display for numbers
const operationDisplay = document.getElementById('operationDisplay'); // Display for operations

buttons.forEach(button => {
  button.addEventListener('click', function () {
    const buttonText = button.textContent;

    // Handling number buttons
    if (buttonText >= '0' && buttonText <= '9') {
      if (operator === "") {
        if (decimalPressed) {
          firstNumber = parseFloat(calculatorDisplay.textContent + '.' + buttonText);
          decimalPressed = false; // Reset decimalPressed
        } else {
          firstNumber = parseFloat(calculatorDisplay.textContent + buttonText);
        }
        displayValue = firstNumber;
      } else {
        if (decimalPressed) {
          secondNumber = parseFloat(calculatorDisplay.textContent + '.' + buttonText);
          decimalPressed = false; // Reset decimalPressed
        } else {
          secondNumber = parseFloat(calculatorDisplay.textContent + buttonText);
        }
        displayValue = secondNumber;
      }
    }
    
    // Handling the decimal button
    else if (buttonText === ".") {
      decimalPressed = true;
    }
    
    // Handling operator buttons
    else if (buttonText === "+" || buttonText === "-" || buttonText === "x" || buttonText === "/") {
      operator = buttonText;
      displayValue = 0;
      operationDisplay.textContent = firstNumber + " " + operator;
    } 
    
    // Handling the equal button
    else if (buttonText === "=") {
      if (operator !== "" && secondNumber !== 0) {
        const result = operate(firstNumber, secondNumber, operator);
        displayValue = result;
        firstNumber = result;
        secondNumber = 0;
        operator = "";
        operationDisplay.textContent = "";
      }
    } 
    
    // Handling the Clear button
    else if (buttonText === "Clear") {
      firstNumber = 0;
      secondNumber = 0;
      operator = "";
      displayValue = 0;
      operationDisplay.textContent = "";
    } 
    
    // Handling the backspace button
    else if (buttonText === "\u232B") {
      if (operator === "") {
        // For the first number
        const stringValue = firstNumber.toString();
        if (stringValue.length > 1) {
          firstNumber = parseFloat(stringValue.slice(0, -1));
          displayValue = firstNumber;
        } else {
          firstNumber = 0;
          displayValue = 0;
        }
      } else {
        // For the second number
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

    // Handling the +/- button
    else if (buttonText === "+/-") {
      if (operator === "") {
        firstNumber = -firstNumber;
        displayValue = firstNumber;
      } else {
        secondNumber = -secondNumber;
        displayValue = secondNumber;
      }
    }

    calculatorDisplay.textContent = displayValue; // Update the displayed value
  });
});
