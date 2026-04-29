document.addEventListener('DOMContentLoaded', () => {
    const currentDisplay = document.getElementById('current-operand');
    const previousDisplay = document.getElementById('previous-operand');
    
    let currentOperand = '0';
    let previousOperand = '';
    let operation = null;

    function updateDisplay() {
        currentDisplay.innerText = currentOperand;
        previousDisplay.innerText = operation ? `${previousOperand} ${operation}` : '';
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (!isNaN(value) || value === '.') {
                appendNumber(value);
            } else if (value === 'C') {
                clear();
            } else if (value === 'DEL') {
                deleteNum();
            } else if (value === '=') {
                compute();
            } else {
                chooseOperator(value);
            }
        });
    });

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
        updateDisplay();
    }

    function chooseOperator(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') compute();
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
        updateDisplay();
    }

    function compute() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '×': result = prev * current; break;
            case '÷': result = prev / current; break;
            default: return;
        }
        currentOperand = result.toString();
        operation = null;
        previousOperand = '';
        updateDisplay();
    }

    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = null;
        updateDisplay();
    }

    function deleteNum() {
        currentOperand = currentOperand.toString().slice(0, -1) || '0';
        updateDisplay();
    }
});