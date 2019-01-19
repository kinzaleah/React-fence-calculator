import React from "react";

class QuestionThree extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Question Three!</h1>
        <h2>Q3: What’s the biggest fence I can make?</h2>
        <p>Please enter how many posts and panels you have:</p>
        Posts:
        <input
          type="text"
          name="q3Posts"
          onChange={this.props.handleBiggestFenceChange}
        />
        <br />
        <br />
        Panels:
        <input
          type="text"
          name="q3Panels"
          onChange={this.props.handleBiggestFenceChange}
        />
        <br />
        <div className="answer-three">{this.props.calculateQ3Answer()}</div>
      </div>
    );
  }
}

export default QuestionThree;
