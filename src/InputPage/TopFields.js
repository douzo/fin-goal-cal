import React from "react";

import { calculateFutureValue } from "../Utils/Calculation.js";

function TopFields({ topFields, setTopFields, isTopFieldsVisible, setIsTopFieldsVisible }) {

  const handleToggleTopFields = () => {
    setIsTopFieldsVisible(!isTopFieldsVisible);
  }
  const handleTopFieldsChange = (event) => {
    const { name, value } = event.target;

    setTopFields((prevState) => {
      const updatedValues = { ...prevState };
      updatedValues[name] = value;
      const yearsForRetirementValue = Number(updatedValues.retirementAge) - Number(updatedValues.age)
      const yearsInRetirementValue = Number(updatedValues.lifeExpectancy) - Number(updatedValues.retirementAge);
      updatedValues.yearsForRetirement = yearsForRetirementValue;
      updatedValues.yearsInRetirement = yearsInRetirementValue;
      const futureValue = calculateFutureValue(
        Number(updatedValues.inflation) / 100,
        Number(updatedValues.yearsForRetirement),
        Number(updatedValues.currentMonthlyExpenses)
      );
      const result = (futureValue * (updatedValues.retiredExpenses / 100)).toFixed(0);
      updatedValues.monthlyExpensesPostRetirement = result;

      return updatedValues;
    })
  };
  return (
    <div>
      <div className="display-flex">
        <h2 className="goals-heading">General And Retirement Information</h2>

        <span
          className="display-flex align-items-center font-size-1point5em margin-left-1rem"
          onClick={handleToggleTopFields}
          style={{ cursor: "pointer" }}
        >
          {isTopFieldsVisible ? (
            <span>&#9660;</span>
          ) : (
            <span>&#9658;</span>
          )}
        </span>
      </div>

      {isTopFieldsVisible && (

        <div className="top-fields">
          <div className="top-left-fields">
            <div className="top-field">
              <label>Monthly expenses today:</label>
              <div className="icon-wrap">
                <span className="icon-code">&#8377;</span>
                <input
                  className="text-currency align-right"
                  type="number"
                  name="currentMonthlyExpenses"
                  value={topFields.currentMonthlyExpenses}
                  onChange={(event) => {
                    handleTopFieldsChange(event);
                  }} />
              </div>
            </div>
            <div className="top-field">
              <label>Inflation (your thoughts in %):</label>
              <div className="icon-wrap">
                <span className="icon-code">%</span>
                <input
                  className="text-currency align-right"
                  type="number"
                  name="inflation"
                  value={topFields.inflation}
                  placeholder="7-10%"
                  onChange={(event) => {
                    handleTopFieldsChange(event);
                  }} />
              </div>
            </div>
            <div className="top-field">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                className="align-right"
                placeholder="enter your age"
                value={topFields.age}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }} />
            </div>
            <div className="top-field">
              <label>Age of retirement:</label>
              <input
                className="align-right"
                type="number"
                name="retirementAge"
                value={topFields.retirementAge}
                placeholder="50?"
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }} />
            </div>
            <div className="top-field">
              <label>Life Expectancy:</label>
              <input
                type="number"
                name="lifeExpectancy"
                placeholder="80?"
                className="align-right"
                value={topFields.lifeExpectancy}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }} />
            </div>
            <div className="top-field">
              <label>% expenses after retirement:</label>
              <input
                type="number"
                name="retiredExpenses"
                className="align-right"
                value={topFields.retiredExpenses}
                placeholder="70-80%"
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }} />
            </div>
            <div className="top-field">
              <label>Annual Income:</label>
              <div className="icon-wrap">
                <span className="icon-code">&#8377;</span>
              </div>
              <input
                className="text-currency align-right"
                type="number"
                name="annualIncome"
                value={topFields.annualIncome}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }} />
            </div>
            <div className="top-field">
              <label>% Annual Increment:</label>
              <input
                type="number"
                className="align-right"
                name="annualIncrement"
                placeholder="10-15%"
                value={topFields.annualIncrement}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }} />
            </div>
          </div>

          <div className="top-right-fields">
            <div className="right-field">
              <label>Number of years for retirement:</label>
              <input
                name="yearsForRetirement"
                type="number"
                value={topFields.yearsForRetirement}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }}
                readOnly />
            </div>
            <div className="right-field">
              <label>Number of years in retirement:</label>
              <input
                type="number"
                name="yearsInRetirement"
                value={topFields.yearsInRetirement}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }}
                readOnly />
            </div>
            <div className="right-field">
              <label>Value of monthly expenses post retirement:</label>
              <input
                type="number"
                name="monthlyExpensesPostRetirement"
                value={topFields.monthlyExpensesPostRetirement}
                onChange={(event) => {
                  handleTopFieldsChange(event);
                }}
                readOnly />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopFields;