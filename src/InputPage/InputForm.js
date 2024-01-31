import React, { useState, useEffect } from "react";
import "./InputForm.css";
import { calculateFutureValue, calculateMonthlySavings } from "../Utils/Calculation.js";
import "./ToolTip.css"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import TopFields from "./TopFields";
import Goals from "./Goals";
import GoalSummary from "./GoalSummary";
import SaveLoadReset from "./SaveLoadReset";


function InputForm() {
  const [topFields, setTopFields] = useState({
    currentMonthlyExpenses: 0,
    inflation: 0,
    annualIncome: 0,
    annualIncrement: 0,
    age: 0,
    retirementAge: 0,
    lifeExpectancy: 0,
    retiredExpenses: 0,
    yearsForRetirement: 0,
    yearsInRetirement: 0,
    monthlyExpensesPostRetirement: 0,
  });

  const [goals, setGoals] = useState([]);
  const [goalSummary, setGoalSummary] = useState([]);
  const [isTopFieldsVisible, setIsTopFieldsVisible] = useState(true);
  const [isGoalFieldsVisible, setIsGoalFieldsVisible] = useState(true);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setGoals((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index][name] = value;

      // Calculate costAtTimeOfGoal if cost, goalInflation, and horizon values are present
      if (
        updatedValues[index].cost &&
        updatedValues[index].goalInflation &&
        updatedValues[index].horizon
      ) {
        var horizon = Number(updatedValues[index].horizon)
        const futureValue = calculateFutureValue(
          Number(updatedValues[index].goalInflation) / 100,
          Number(updatedValues[index].horizon),
          Number(updatedValues[index].cost)
        );
        updatedValues[index].costAtTimeOfGoal = futureValue;

        if (horizon <= 3) {
          updatedValues[index].toBeInvestedAmountReturnRate = 7; // fixed deposit
        } else if (horizon > 3 && horizon < 7) {
          updatedValues[index].toBeInvestedAmountReturnRate = 10; // debt mutual funds and bonds
        } else if (horizon >= 7) {
          updatedValues[index].toBeInvestedAmountReturnRate = 12; // equity mutual funds
        }

        updatedValues[index].toBeInvestedAmount = calculateMonthlySavings(updatedValues[index].cost,
          horizon,
          Number(updatedValues[index].goalInflation) / 100,
          Number(updatedValues[index].toBeInvestedAmountReturnRate) / 100)
      }
      // Calculate totalMonthlyInvestmentAmount
      // calculateGoalSummary();
      return updatedValues;
    });

  };

  useEffect(() => {
    calculateGoalSummary();
  }, [goals]);

  const calculateGoalSummary = () => {
    const summary = {
      cost: 0,
      costAtTimeOfGoal: 0,
      alreadyInvestedAmount: 0,
      toBeInvestedAmount: 0,
      goalInflation: 0,
      horizon: 0,
      alreadyInvestedAmountReturnRate: 0,
      toBeInvestedAmountReturnRate: 0
    };
    summary.cost = goals.reduce((sum, goal) => sum + Number(goal.cost), 0);
    summary.costAtTimeOfGoal = goals.reduce((sum, goal) => sum + Number(goal.costAtTimeOfGoal), 0);
    summary.alreadyInvestedAmount = goals.reduce((sum, goal) => sum + Number(goal.alreadyInvestedAmount), 0);
    summary.toBeInvestedAmount = goals.reduce((sum, goal) => sum + Number(goal.toBeInvestedAmount), 0);


    const totalInflation = goals.reduce((sum, goal) => sum + Number(goal.goalInflation), 0);
    summary.goalInflation = totalInflation / goals.length;


    const totalHorizon = goals.reduce((sum, goal) => sum + Number(goal.horizon), 0);
    summary.horizon = totalHorizon / goals.length;

    const totalAlreadyInvestedAmountReturnRate = goals.reduce((sum, goal) => sum + Number(goal.alreadyInvestedAmountReturnRate), 0);
    summary.alreadyInvestedAmountReturnRate = totalAlreadyInvestedAmountReturnRate / goals.length;

    const totalToBeInvestedAmountReturnRate = goals.reduce((sum, goal) => sum + Number(goal.toBeInvestedAmountReturnRate), 0);
    summary.toBeInvestedAmountReturnRate = totalToBeInvestedAmountReturnRate / goals.length;

    setGoalSummary(summary);
  }

  const handleAddGoal = (index) => {
    setGoals((prevState) => {
      const updatedGoals = [...prevState];
      updatedGoals.splice(index + 1, 0, {
        goal: "",
        cost: 0,
        goalInflation: 0,
        horizon: 0,
        category: "",
        costAtTimeOfGoal: 0,
        alreadyInvestedAmount: 0,
        alreadyInvestedAmountReturnRate: 0,
        toBeInvestedAmount: 0,
        toBeInvestedAmountReturnRate: 0
      });
      return updatedGoals;
    });
    if (goalSummary.length === 0) {
      setGoalSummary((prevState) => [
        ...prevState,
        {
          goal: "Summary",
          cost: 0,
          goalInflation: 0,
          horizon: 0,
          category: "",
          costAtTimeOfGoal: 0,
          alreadyInvestedAmount: 0,
          alreadyInvestedAmountReturnRate: 0,
          toBeInvestedAmount: 0,
          toBeInvestedAmountReturnRate: 0
        },
      ]);
    }
  };

  const handleRemoveGoal = (index) => {
    setGoals((prevState) => {
      const updatedValues = [...prevState];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const handleSave = () => {
    // Save topFields and goals object to local storage
    localStorage.setItem("topFields", JSON.stringify(topFields));
    localStorage.setItem("goals", JSON.stringify(goals));
  };
  const handleLoad = () => {
    // Load topFields and goals object from local storage
    const topFields = JSON.parse(localStorage.getItem("topFields"));
    const goals = JSON.parse(localStorage.getItem("goals"));
    setTopFields(topFields);
    setGoals(goals);
  }
  return (
    <><div className="container display-inline-flex flex-direction-column">
      {/* SaveLoadReset component */}
      <SaveLoadReset handleSave={handleSave} handleLoad={handleLoad} />

      <section className="general-info">
        {/* TopFields component */}
        <TopFields
          topFields={topFields}
          setTopFields={setTopFields}
          isTopFieldsVisible={isTopFieldsVisible}
          setIsTopFieldsVisible={setIsTopFieldsVisible}
        />
      </section>

      <div className="goals">
        {/* Goals component */}
        <Goals
          goals={goals}
          handleInputChange={handleInputChange}
          handleAddGoal={handleAddGoal}
          handleRemoveGoal={handleRemoveGoal}
          isGoalFieldsVisible={isGoalFieldsVisible}
          setIsGoalFieldsVisible={setIsGoalFieldsVisible}
        />

      {/* GoalSummary component */}
      <GoalSummary goalSummary={goalSummary} />
      </div>
    </div>

      <ReactTooltip
        id="save-tooltip"
        place="bottom"
        content="Don't worry, We don't save your data with us, we just save it in your local." />
      <ReactTooltip
        id="load-tooltip"
        place="bottom"
        content="Loads data from your local" />
    </>
  );
}

export default InputForm;
