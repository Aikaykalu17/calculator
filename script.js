'use strict';

const display = document.getElementById('display');
const themeSelector = document.querySelector('.theme-indicator');
const buttonField = document.querySelector('.button-field');
const buttons = document.querySelectorAll('button');
const changeTheme = document.querySelectorAll('.theme-change');

// Format value function

const formatNumber = function (num) {
  return parseFloat(num).toLocaleString();
};

// Calculate and display function

// const calcFunction = function () {
//   let currentNumber = '';
//   let previousNumber = '';
//   let operator = '';
//   let result = '';

//   buttons.forEach(button => {
//     button.addEventListener('click', function (e) {
//       e.preventDefault();
//       let value = button.textContent;
//       if (button.classList.contains('number')) {
//         if (display.value === '' && previousNumber !== '') return;
//         if (result !== '') {
//           display.value = '';
//           currentNumber = '';
//           previousNumber = '';
//           operator = '';
//           result = '';
//         }
//         currentNumber += value;
//         display.value += value;
//       } else if (button.classList.contains('operator')) {
//         if (currentNumber === '' && result !== '') {
//           currentNumber = result;
//           result = '';
//         }
//         if (currentNumber === '') return;
//         previousNumber = currentNumber;
//         operator = value;
//         currentNumber = '';
//         display.value += `${value}`;
//       } else if (button.classList.contains('equals')) {
//         if (currentNumber === '' || previousNumber === '') return;
//         let result = calculate(previousNumber, currentNumber, operator);
//         display.value = formatNumber(result.toString());
//         previousNumber = '';
//         currentNumber = result.toString();
//         operator = '';
//       } else if (button.classList.contains('clear')) {
//         display.value = '';
//         currentNumber = '';
//         previousNumber = '';
//         operator = '';
//         result = '';
//       } else if (button.classList.contains('delete')) {
//         display.value = display.value.slice(0, -1);
//         if (currentNumber !== '') {
//           currentNumber = currentNumber.slice(0, -1);
//         }
//       } else if (button.classList.contains('decimal')) {
//         if (!currentNumber.includes('.')) {
//           if (currentNumber === '') {
//             currentNumber = '0.';
//             display.value += currentNumber;
//           } else {
//             currentNumber = '.';
//             display.value += currentNumber;
//           }
//         }
//       }
//     });
//   });
// };
// calcFunction();

const calcFunction = function () {
  let currentNumber = '';
  let previousNumber = '';
  let operator = '';
  let result = '';
  let isResult = false;

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      let value = button.textContent;
      if (button.classList.contains('number')) {
        if (display.value === '' && previousNumber !== '') return;
        if (isResult) {
          display.value = value;
          currentNumber = value;
          isResult = false;
        } else {
          currentNumber += value;
          display.value += value;
        }
      } else if (button.classList.contains('operator')) {
        isResult = false;
        if (currentNumber === '' && result !== '') {
          currentNumber = result;
          result = '';
        }
        if (currentNumber === '') return;
        previousNumber = currentNumber;
        operator = value;
        currentNumber = '';
        display.value += `${value}`;
        isResult = false;
      } else if (button.classList.contains('equals')) {
        if (currentNumber === '' || previousNumber === '') return;
        let result = calculate(previousNumber, currentNumber, operator);
        display.value = formatNumber(result.toString());
        previousNumber = '';
        currentNumber = result.toString();
        operator = '';
        isResult = true;
      } else if (button.classList.contains('clear')) {
        display.value = '';
        currentNumber = '';
        previousNumber = '';
        operator = '';
        result = '';
        isResult = false;
      } else if (button.classList.contains('delete')) {
        display.value = display.value.slice(0, -1);
        if (currentNumber !== '') {
          currentNumber = currentNumber.slice(0, -1);
        }
      } else if (button.classList.contains('decimal')) {
        if (isResult) {
          display.value = '0.';
          currentNumber = '0.';
          isResult = true;
        } else if (!currentNumber.includes('.')) {
          currentNumber += '.';
          display.value += '.';
        }
      }
    });
  });
};
calcFunction();

// Calculate function

const calculate = function (previousNumber, currentNumber, operator) {
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);

  switch (operator) {
    case '+':
      return num1 + num2;

    case '-':
      return num1 - num2;

    case '*':
      return num1 * num2;

    case '/':
      return num1 / num2;

    default:
      return 0;
  }
};

// Switch theme function

const switchTheme = function () {
  buttonField.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('theme-button')) {
      const themeNumber = e.target.dataset.theme;
      changeTheme.forEach(themeChanger => {
        themeChanger.classList.remove('theme-1', 'theme-2', 'theme-3');
        themeChanger.classList.add(`theme-${themeNumber}`);

        themeSelector.classList.remove('pos-1', 'pos-2', 'pos-3');
        themeSelector.classList.add(`pos-${themeNumber}`);
      });
    }
  });
};
switchTheme();
