'use strict';

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
    this.checkExp = false;
    this.minus = false;
  }

  clear() {
    this.previousOperandText.innerText = '';
    this.currentOperand = '';
    this.previousOperand = '';
    this.operand = '';
    this.minus = false;
    this.checkExp = false;
    console.log('clear');
  }

  getNumber(number) {
    if (
      this.checkExp === true &&
      this.currentOperand !== '' &&
      this.previousOperand === ''
    ) {
      this.currentOperand = number;
      this.checkExp = false;
      return;
    }

    number = this.minus === true ? `-${number}` : number;
    console.log(number);
    this.minus = false;

    if (this.currentOperand === '' || this.previousOperand === '') {
      this.currentOperand += number;
    } else {
      this.currentOperand += number;
    }
  }

  getOperand(operand) {
    this.operand = operand;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  operation() {
    const prev = +this.previousOperand;
    const current = +this.currentOperand;
    let sum;
    switch (this.operand) {
      case '+':
        sum = current + prev;
        break;
      case '-':
        sum = prev - current;
        console.log(current, prev);
        break;
      case '*':
        sum = current * prev;
        break;
      case '÷':
        sum = prev / current;
        console.log(current, prev);
        break;
      case '√‎':
        if (prev === '') {
          sum = Math.sqrt(current);
          break;
        }
        sum = Math.sqrt(prev);
        break;
      case '^':
        sum = Math.pow(prev, current);
    }
    if (this.operand === '') return;

    this.currentOperand = +sum.toFixed(9);
    this.previousOperand = '';
    this.checkExp = true;
    this.operand = '';
  }

  updateDisplay() {
    if (this.operand !== '' && this.previousOperand !== '') {
      this.previousOperandText.innerText = this.previousOperand + this.operand;
    }
    if (this.previousOperand === '') {
      this.currentOperandText.innerText = this.currentOperand;
      this.previousOperandText.innerText = '';
    }
    if (this.minus === true) {
      this.currentOperandText.innerText = '-' + this.currentOperand;
    } else {
      this.currentOperandText.innerText = this.currentOperand;
    }
  }
}

const previousOperandText = document.querySelector('[data-previous-operand]'),
  currentOperandText = document.querySelector('[data-current-operand]'),
  btnClear = document.querySelector('[data-all-clear]'),
  btnDelete = document.querySelector('[data-delete]'),
  btnNumbers = document.querySelectorAll('[data-number]'),
  btnOperation = document.querySelectorAll('[data-operation]'),
  btnEquals = document.querySelector('[data-equals]'),
  btnMinus = document.querySelector('[data-minus]');

const calculator = new Calculator(previousOperandText, currentOperandText);

btnNumbers.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.getNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

btnOperation.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (calculator.currentOperand !== '') {
      calculator.operation();
      calculator.getOperand(btn.innerText);
      if (btn.innerHTML === '√‎') {
        calculator.operation();
      }
      calculator.updateDisplay();
    }
  });
});

btnEquals.addEventListener('click', () => {
  calculator.operation();
  calculator.updateDisplay();
});

btnClear.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

btnDelete.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

btnMinus.addEventListener('click', () => {
  calculator.minus = calculator.minus === false ? true : false;
  calculator.updateDisplay();
});
