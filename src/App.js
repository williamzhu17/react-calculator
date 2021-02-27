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

    console.log(event);

    // if (event.nativeEvent.data === "e") {
    //   return;
    // }

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

  //Resets form and state values
  function handleReset() {
    setCalculator({
      ...calculator, 
      "firstNumber" : "",
      "secondNumber" : "",
      "operator" : "add",
      "result" : "",
    });
  }

  //Checks if inputted character is a number
  function checkForInvalidCharacters(event) {
    const invalidCharacters = [
      "-", 
      "+", 
      "e", 
    ]
    if (invalidCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }

  return(
    <div>
      <h2>Calculator</h2>

      <div className="elements">
        <form onSubmit={handleSubmit}>

          <div className="elements">
            <label htmlFor="firstNumberId">Enter in First Number: </label>
            <input 
              type="number" 
              id="firstNumberId" 
              name="firstNumber" 
              className="calculatorInput" 
              step="0.01" 
              value={calculator.firstNumber} 
              onChange={handleChange}
              onKeyDown={checkForInvalidCharacters} />
          </div>
          
          <div className="elements">
            <label htmlFor="operatorId">Choose an Operator: </label>
            <select id="operatorId" name="operator" className="calculatorInput" onChange={handleChange}>
              <option value="add">+</option>
              <option value="subtract">-</option>
              <option value="multiply">*</option>
              <option value="divide">/</option>
            </select>
          </div>

          <div className="elements">
            <label htmlFor="secondNumberId">Enter in Second Number: </label>
            <input 
              type="number" 
              id="secondNumberId" 
              name="secondNumber" 
              className="calculatorInput" 
              step="0.01" 
              value={calculator.secondNumber} 
              onChange={handleChange}
              onKeyDown={checkForInvalidCharacters} />
          </div>

          <div className="elements">
            <input type="reset" id="resetButtonId" name="resetButton" onClick={handleReset} />
            <input type="submit" id="submitButtonId" name="submitButton" />
          </div>

        </form>
      </div>

      <div className="elements" id="resultDivId">
          <span id="resultId" name="result">Your result is: {calculator.result}</span>
      </div>
    </div>
  );

}

export default App;
