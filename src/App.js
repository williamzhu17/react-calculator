import React, { useState } from "react";
import './App.css';

function App() {

  const [calculator, setCalculator] = useState({
    "firstNumber": "", 
    "operator": "add",
    "secondNumber": "",
    "result": "",
  });

  //Updates calculator state whenever value in textboxes or select input changes
  function handleChange(event) {
    const targetName = event.target.name;
    let value = "";

    //Determines if change is for operator or for numbers
    if (targetName === "operator") {
      value = event.target.value;
    } else {
      value = event.target.valueAsNumber;
    }

    setCalculator({
      ...calculator, 
      [targetName] : value,
    });
  }

  //Calculates the final result after usre presses submit
  function handleSubmit(event) {
    event.preventDefault();

    //Obtains values from updated states
    const firstNumberFloat = calculator.firstNumber;
    const secondNumberFloat = calculator.secondNumber;

    //Send alert and end function if no number inputted in textbox
    if (Number.isNaN(firstNumberFloat) || Number.isNaN(secondNumberFloat)) {
      setCalculator({
        ...calculator, 
        "result": "Please Enter in Numbers",
      });
      return;
    }

    //Calculate final result and set it as a calculator state
    let finalResult = 0;
    const operatorValue = calculator.operator;
    if (operatorValue === "add") {
      finalResult = firstNumberFloat + secondNumberFloat;
    } else if (operatorValue === "subtract") {
      finalResult = firstNumberFloat - secondNumberFloat;
    } else if (operatorValue === "multiply") {
      finalResult = firstNumberFloat * secondNumberFloat;
    } else if (operatorValue === "divide") {
      finalResult = firstNumberFloat / secondNumberFloat;
    } else {
      finalResult = "An error happened!";
    }

    setCalculator({
      ...calculator, 
      "result": finalResult,
    });
  }

  return(
    <div>
      <h2>Calculator</h2>

      <div class="elements">
        <form onSubmit={handleSubmit}>

          <div class="elements">
            <label htmlFor="firstNameId">Enter in First Number: </label>
            <input type="number" id="firstNameId" name="firstNumber" class="calculatorInput" step="0.01" onChange={handleChange} />
          </div>
          
          <div class="elements">
            <label htmlFor="operatorId">Choose an Operator: </label>
            <select id="operatorId" name="operator" class="calculatorInput" onChange={handleChange}>
              <option value="add">+</option>
              <option value="subtract">-</option>
              <option value="multiply">*</option>
              <option value="divide">/</option>
            </select>
          </div>

          <div class="elements">
            <label htmlFor="secondNumberId">Enter in Second Number: </label>
            <input type="number" id="secondNumberId" name="secondNumber" class="calculatorInput" step="0.01" onChange={handleChange} />
          </div>

          <div class="elements">
            <input type="reset" id="resetButtonId" name="resetButton" />
            <input type="submit" id="submitButtonId" name="submitButton" />
          </div>

        </form>
      </div>

      <div class="elements" id="resultDivId">
          <span id="resultId" name="result">Your result is: {calculator.result}</span>
      </div>
    </div>
  );

}

export default App;
