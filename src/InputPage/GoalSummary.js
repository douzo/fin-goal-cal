// GoalSummary.js
import React from "react";

function GoalSummary({ goalSummary }) {
  // Implement the GoalSummary component here
  return (
      <div className="goal-row flex-direction-column">

        <h3 className="goals-heading align-self-flex-start">Summary</h3>
        <div className="display-flex">
          <input
            type="text"
            name="goal"
            value={goalSummary.goal}
            readOnly
            placeholder="Summary" />
          <div>
            <div className="icon-wrap">
              <span className="icon-code">&#8377;</span>
            </div>
            <input
              className="text-currency align-right"
              type="number"
              name="cost"
              value={goalSummary.cost}
              readOnly />
          </div>
          <input
            type="number"
            name="goalInflation"
            value={goalSummary.goalInflation}
            readOnly
            className="small-input align-right" />
          <input
            type="number"
            name="horizon"
            value={goalSummary.horizon}
            readOnly
            className="small-input align-right" />
          <select
            name="category"
            value={goalSummary.category}
            readOnly
          >
          </select>

          <div>
            <div className="icon-wrap">
              <span className="icon-code">&#8377;</span>
            </div>
            <input
              className="text-currency align-right"
              type="number"
              name="costAtTimeOfGoal"
              value={goalSummary.costAtTimeOfGoal}
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
              value={goalSummary.alreadyInvestedAmount}
              readOnly />
          </div>
          <input
            type="number"
            name="alreadyInvestedAmountReturnRate"
            value={goalSummary.alreadyInvestedAmountReturnRate}
            readOnly
            className="small-input align-right" />

          <div>
            <div className="icon-wrap">
              <span className="icon-code">&#8377;</span>
            </div>
            <input
              className="text-currency align-right small-input"
              type="number"
              name="toBeInvestedAmount"
              value={goalSummary.toBeInvestedAmount}
              readOnly />
          </div>
          <input
            type="number"
            name="toBeInvestedAmountReturnRate"
            value={goalSummary.toBeInvestedAmountReturnRate}
            className="small-input align-right"
            readOnly />
        </div>

    </div>);
}

export default GoalSummary;