import React from "react";

class SavedCalculations extends React.Component {
  render() {
    const savedCalculations = this.props.savedCalculations;

    return (
      <div>
        <h1>Saved Calculations!</h1>

        <button onClick={this.props.removeSavedCalculations}>Clear</button>
        <br />
        {savedCalculations.map(calc => {
          if (calc.q === 1) {
            return (
              <div key={calc.timestamp.getTime()}>
                <p>Question 1</p>
                Posts input: {calc.q1InputPosts} <br />
                Panels needed: {calc.q1PanelsNeeded}
              </div>
            );
          } else if (calc.q === 2) {
            return (
              <div key={calc.timestamp.getTime()}>
                <p>Question 2</p>
                Post width: {calc.q2PostWidth}m <br />
                Panel width: {calc.q2PanelWidth}m <br />
                Length input: {calc.q2InputLength}m <br />
                Panels needed: {calc.q2PanelsNeeded} <br />
                Posts needed: {calc.q2PostsNeeded} <br />
                Total length: {calc.q2OutputLength}m
              </div>
            );
          } else {
            return (
              <div key={calc.timestamp.getTime()}>
                <p>Question 3</p>
                <p>
                  Post width: {calc.q3PostWidth}m <br />
                  Panel width: {calc.q3PanelWidth}m <br />
                  Posts input: {calc.q3InputPosts} <br />
                  Panels input: {calc.q3InputPanels} <br />
                  Length: {calc.q3Length}m <br />
                  Leftover Posts: {calc.q3LeftoverPosts} <br />
                  Leftover Panels: {calc.q3LeftoverPanels} <br />
                </p>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default SavedCalculations;
