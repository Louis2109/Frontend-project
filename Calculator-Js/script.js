// Initialize variables
let displayValue = '';
let currentOperation = '';
let lastWasOperator = false;
let calculationDone = false;

// Get DOM elements
const display = document.querySelector('.display');

// Add event listener to all buttons
document.querySelector('.buttons').addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const button = e.target;
    const buttonValue = button.dataset.value;

    if (button.classList.contains('number')) {
        inputNumber(buttonValue);
    } else if (button.classList.contains('operator')) {
        inputOperator(buttonValue);
    }

    updateDisplay();
});

// Handle number inputs
function inputNumber(num) {
    if (calculationDone) {
        currentOperation = '';
        calculationDone = false;
    }

    if (lastWasOperator) {
        currentOperation += num;
        lastWasOperator = false;
    } else {
        currentOperation += num;
    }
}

// Handle operator inputs
function inputOperator(nextOperator) {
    // Handle clear button
    if (nextOperator === 'clear') {
        currentOperation = '';
        lastWasOperator = false;
        calculationDone = false;
        return;
    }

    // Handle backspace
    if (nextOperator === 'backspace') {
        if (!calculationDone) {
            currentOperation = currentOperation.slice(0, -1);
        }
        return;
    }

    // Handle equals
    if (nextOperator === '=') {
        if (currentOperation) {
            try {
                // Replace × with * and evaluate
                let evaluateExp = currentOperation.replace(/×/g, '*');
                const result = eval(evaluateExp);
                displayValue = result;
                currentOperation = result.toString();
                calculationDone = true;
            } catch (error) {
                currentOperation = 'Error';
                calculationDone = true;
            }
        }
        return;
    }

    // Handle other operators
    if (!lastWasOperator && currentOperation !== '') {
        currentOperation += nextOperator === '*' ? '×' : nextOperator;
        lastWasOperator = true;
        calculationDone = false;
    }
}

// Update display
function updateDisplay() {
    if (calculationDone) {
        display.value = displayValue;
    } else {
        display.value = currentOperation;
    }
}