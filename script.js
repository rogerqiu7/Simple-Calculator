// select all button elements as variables
// select previous and current operands as variables
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
	"[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-current-operand]"
);

// create class, constructor takes previous and current text elements
//set the this. variables
// clear calculator every time new one is opened
class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	// set clear function, remove all values on screen
	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	// set delete function, set current operand to string, delete last value
	// select all numbers from index 0 to one from end
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	// set append function that adds number to screen
	// if number is period, and current operand already has period, just return
	// set current operand to appending number as a string to it
	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	// when typing a number then clicking an operation button, bring both number and operation back to previous operand
	// check if there are numbers first for us to perform on
	// another check, if previous operand is not empty string, do the computation
	// set operation = operation we passed in
	// were done typing the current number so we recycle it to previous and clear out current
	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	// take values in calculator and compute a single value
	// convert prevoius and current string to numbers
	// check if there is values, return if empty
	// if statements chained, if plus, minus, multiply, divide: execute computation to previous plus current. else return
	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}

		// set current operand as computation
		// clear previous and operation
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	//update the values inside the output
	getDisplayNumber(number) {
		return number;
	}

	//  set previous operand and text element as prevoius operand
	// if operation isnt null, add the operation appended to number
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = "";
		}
	}
}

// define class that takes constructors from previous class
const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

// for all number buttons, add event listener for when clicked on
// take calculator and add number of whatever is in button
// update the display right after
numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

// for all operations buttons, when clicked, choose operation takes button
// update the display
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

// equals button, onclick, computes and displays it
equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

// all clear button, onclick, performs clear function
allClearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});

// delete button, onclick, performs delete function
deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
