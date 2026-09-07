// NeoCalc Core Arithmetic Engine & Event-Driven UI Logic
class Calculator {
  constructor(previousOperandElem, currentOperandElem) {
    this.previousOperandElem = previousOperandElem;
    this.currentOperandElem = currentOperandElem;
    this.history = [];
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.isResultState = false;
    this.hasError = false;
  }

  clearEntry() {
    this.currentOperand = '0';
    this.hasError = false;
  }

  delete() {
    if (this.hasError || this.isResultState) {
      this.clearAll();
      return;
    }
    if (this.currentOperand.length <= 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (this.hasError) this.clearAll();

    if (this.isResultState) {
      this.currentOperand = '';
      this.isResultState = false;
    }

    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
      return;
    }

    if (number === '.' && this.currentOperand.includes('.')) return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  toggleSign() {
    if (this.hasError || this.currentOperand === '0') return;
    if (this.currentOperand.startsWith('-')) {
      this.currentOperand = this.currentOperand.substring(1);
    } else {
      this.currentOperand = '-' + this.currentOperand;
    }
  }

  chooseOperation(operation) {
    if (this.hasError) this.clearAll();

    if (this.currentOperand === '' && this.previousOperand !== '') {
      // Allow switching operators before typing next number
      this.operation = operation;
      return;
    }

    if (this.previousOperand !== '') {
      this.compute();
      if (this.hasError) return;
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.isResultState = false;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '−':
      case '-':
        computation = prev - current;
        break;
      case '×':
      case '*':
        computation = prev * current;
        break;
      case '÷':
      case '/':
        if (current === 0) {
          this.hasError = true;
          this.currentOperand = 'Cannot divide by 0';
          this.previousOperand = '';
          this.operation = undefined;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // Fix floating point precision artifacts (e.g., 0.1 + 0.2 = 0.30000000000000004)
    const rounded = Math.round((computation + Number.EPSILON) * 10000000000) / 10000000000;
    
    // Save to calculation history
    this.history.unshift({
      expression: `${prev} ${this.operation} ${current}`,
      result: rounded
    });

    this.currentOperand = rounded.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.isResultState = true;
  }

  getDisplayNumber(number) {
    if (this.hasError) return number;
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.hasError) {
      this.currentOperandElem.textContent = this.currentOperand;
      this.currentOperandElem.classList.add('error');
      this.previousOperandElem.textContent = '';
      return;
    }

    this.currentOperandElem.classList.remove('error');
    this.currentOperandElem.textContent = this.getDisplayNumber(this.currentOperand) || '0';

    if (this.operation != null) {
      this.previousOperandElem.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElem.textContent = '';
    }
  }
}

// Initialise Calculator & Attach Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const previousOperandElem = document.getElementById('previous-operand');
  const currentOperandElem = document.getElementById('current-operand');
  const calculator = new Calculator(previousOperandElem, currentOperandElem);

  const historyToggleBtn = document.getElementById('btn-toggle-history');
  const historyDrawer = document.getElementById('history-drawer');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('btn-clear-history');

  function renderHistory() {
    if (calculator.history.length === 0) {
      historyList.innerHTML = '<li class="history-empty">No calculations yet</li>';
      return;
    }

    historyList.innerHTML = '';
    calculator.history.slice(0, 10).forEach(item => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `<span>${item.expression}</span> <strong>= ${item.result}</strong>`;
      li.addEventListener('click', () => {
        calculator.clearAll();
        calculator.currentOperand = item.result.toString();
        calculator.isResultState = true;
        calculator.updateDisplay();
      });
      historyList.appendChild(li);
    });
  }

  // Keypad Click Event Delegations
  const keypad = document.getElementById('keypad');
  keypad.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    if (target.dataset.number != null) {
      calculator.appendNumber(target.dataset.number);
      calculator.updateDisplay();
    } else if (target.dataset.operator != null) {
      calculator.chooseOperation(target.dataset.operator);
      calculator.updateDisplay();
    } else if (target.dataset.action === 'calculate') {
      calculator.compute();
      calculator.updateDisplay();
      renderHistory();
    } else if (target.dataset.action === 'all-clear') {
      calculator.clearAll();
      calculator.updateDisplay();
    } else if (target.dataset.action === 'clear-entry') {
      calculator.clearEntry();
      calculator.updateDisplay();
    } else if (target.dataset.action === 'backspace') {
      calculator.delete();
      calculator.updateDisplay();
    } else if (target.dataset.action === 'toggle-sign') {
      calculator.toggleSign();
      calculator.updateDisplay();
    } else if (target.dataset.action === 'decimal') {
      calculator.appendNumber('.');
      calculator.updateDisplay();
    }
  });

  // History Drawer Toggle
  if (historyToggleBtn && historyDrawer) {
    historyToggleBtn.addEventListener('click', () => {
      historyDrawer.classList.toggle('visible');
      renderHistory();
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      calculator.history = [];
      renderHistory();
    });
  }

  // Keyboard Navigation Support
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
    } else if (e.key === '+' || e.key === '-') {
      calculator.chooseOperation(e.key === '-' ? '−' : '+');
      calculator.updateDisplay();
    } else if (e.key === '*') {
      calculator.chooseOperation('×');
      calculator.updateDisplay();
    } else if (e.key === '/') {
      e.preventDefault();
      calculator.chooseOperation('÷');
      calculator.updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculator.compute();
      calculator.updateDisplay();
      renderHistory();
    } else if (e.key === 'Backspace') {
      calculator.delete();
      calculator.updateDisplay();
    } else if (e.key === 'Escape') {
      calculator.clearAll();
      calculator.updateDisplay();
    }
  });
});
