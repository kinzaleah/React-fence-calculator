import React from "react";

class QuestionThree extends React.Component {
  render() {
    return (
      <div>
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
        {this.props.inputPosts && this.props.inputPanels && (
          <div className="answer-three">
            {this.props.displayQ3Answer()}
            <br />
            <br />
            <button type="submit" onClick={this.props.handleSaveQ3}>
              Save result
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionThree;
