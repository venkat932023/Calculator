let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    previousOperandElement.innerText = previousOperand;
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') calculate();
    operation = op;
    previousOperand = currentOperand + ' ' + operation;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentOperand = result.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLastChar() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}


document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendNumber('.');
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Escape') clearAll();
    else if (e.key === 'Backspace') deleteLastChar();
});