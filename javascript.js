let firstNumber = 0;
let SecondNumber = 0;
let operator = "";
let displayValue = 0;

const add = function (firstNumber, SecondNumber) {
  return firstNumber + SecondNumber;
};

const subtract = function (firstNumber, SecondNumber) {
  return firstNumber - SecondNumber;
};

const multiply = function (firstNumber, SecondNumber) {
  return firstNumber * SecondNumber;
};

const divide = function (firstNumber, SecondNumber) {
  return firstNumber/ SecondNumber;
};

function operate (firstNumber, SecondNumber, operator)
  if (operator === "+") {
    operate = add (firstNumber, SecondNumber);
  }else if (operator === "-") {
    operate = subtract (firstNumber, SecondNumber);
  }else if (operator === "*") {
    operate = multiply (firstNumber, SecondNumber);
  }else if (operator === "/"); {
    operate = divide(firstNumber, SecondNumber);
  }

