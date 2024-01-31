// Goals.js
import React from "react";

function Goals({
  goals,
  handleInputChange,
  handleAddGoal,
  handleRemoveGoal,
  isGoalFieldsVisible,
  setIsGoalFieldsVisible
}) {
  const handleToggleGoalFields = () => {
    setIsGoalFieldsVisible(!isGoalFieldsVisible);
  }
  return (
    <div>
      <div className="display-flex">
        <h2 className="goals-heading">Goals</h2>
        <span
          className="display-flex align-items-center font-size-1point5em margin-left-1rem"
          onClick={handleToggleGoalFields}
          style={{ cursor: "pointer" }}
        >
          {isGoalFieldsVisible ? (
            <span>&#9660;</span>
          ) : (
            <span>&#9658;</span>
          )}
        </span>
      </div>
      {isGoalFieldsVisible && (
        <div className="goals-list">
          <div className="goal-row heading">
            <label>What are you saving for?</label>
            <label>What is the goal's todays cost? (in &#8377;)</label>
            <label className="small-input">Estimated Annual Inflation Rate for this goal? (in %)</label>
            <label className="small-input">When do you want to reach your goal? (in years)</label>
            <label>Category (select)</label>
            <label>Cost at time of Goal</label>
            <label>How much you have saved already? (in &#8377;)</label>
            <label className="small-input">Already Invested Return Rate</label>
            <label className="small-input">Save at-least this amount monthly (in &#8377;)</label>
            <label className="small-input">Start saving in this return rate</label>
          </div>
          {goals.map((goal, index) => (
            <div key={index} className="goal-row">
              <input
                type="text"
                name="goal"
                value={goal.goal}
                onChange={(event) => handleInputChange(event, index)}
                placeholder="Goal" />
              <div>
                <div className="icon-wrap">
                  <span className="icon-code">&#8377;</span>
                </div>
                <input
                  className="text-currency align-right"
                  type="number"
                  name="cost"
                  value={goal.cost}
                  onChange={(event) => handleInputChange(event, index)} />
              </div>
              <input
                type="number"
                name="goalInflation"
                value={goal.goalInflation}
                onChange={(event) => handleInputChange(event, index)}
                className="small-input align-right" />
              <input
                type="number"
                name="horizon"
                value={goal.horizon}
                onChange={(event) => handleInputChange(event, index)}
                className="small-input align-right" />
              <select
                name="category"
                value={goal.category}
                onChange={(event) => handleInputChange(event, index)}
              >
                <option value="">Select Field</option>
                <option value="Family">Family</option>
                <option value="Children">Children</option>
                <option value="Personal">Personal</option>
                <option value="Retirement">Retirement</option>
                <option value="Other">Other</option>
              </select>

              <div>
                <div className="icon-wrap">
                  <span className="icon-code">&#8377;</span>
                </div>
                <input
                  className="text-currency align-right"
                  type="number"
                  name="costAtTimeOfGoal"
                  value={goal.costAtTimeOfGoal}
                  onChange={(event) => handleInputChange(event, index)}
                  readOnly />
              </div>
              <div>
                <div className="icon-wrap">
                  <span className="icon-code">&#8377;</span>
                </div>
                <input
                  className="text-currency align-right"
                  type="number"
                  name="alreadyInvestedAmount"
                  value={goal.alreadyInvestedAmount}
                  onChange={(event) => handleInputChange(event, index)}
                  placeholder="Already invested amount" />
              </div>
              <input
                type="number"
                name="alreadyInvestedAmountReturnRate"
                value={goal.alreadyInvestedAmountReturnRate}
                onChange={(event) => handleInputChange(event, index)}
                className="small-input align-right" />

              <div>
                <div className="icon-wrap">
                  <span className="icon-code">&#8377;</span>
                </div>
                <input
                  className="text-currency align-right small-input"
                  type="number"
                  name="toBeInvestedAmount"
                  value={goal.toBeInvestedAmount}
                  readOnly />
              </div>
              <input
                type="number"
                name="toBeInvestedAmountReturnRate"
                value={goal.toBeInvestedAmountReturnRate}
                className="small-input align-right"
                readOnly />
              <button
                type="button"
                onClick={() => handleRemoveGoal(index)}
                className="add-remove-button remove-button margin-right-1rem"
              >
                x
              </button>
              <button
                type="button"
                onClick={() => handleAddGoal(index)}
                className="add-remove-button add-button"
              >
                +
              </button>
            </div>
          ))}
          {(goals === undefined || goals === null || goals.length === 0) && (
            <button
              type="button"
              onClick={() => handleAddGoal(0)}
              className="add-remove-button add-button"
            >
              +
            </button>
          )}

        </div>
      )
      }
    </div>
  );
}

export default Goals;