import React from "react";

class QuestionOne extends React.Component {
  render() {
    let answerOne = this.props.inputPosts
      ? `If you have ${this.props.inputPosts} posts then you will need ${
          this.props.panelsNeeded
        } panels`
      : null;

    return (
      <div>
        <h2>Q1: How many panels should I buy so all my posts are used up?</h2>
        <p>Please enter the number of posts you have:</p>
        <input
          type="text"
          name="posts"
          onChange={this.props.handlePostChange}
        />

        {this.props.inputPosts && (
          <div className="answer-one">
            {answerOne}
            <br />
            <br />
            <button type="submit" onClick={this.props.handleSaveQ1}>
              Save result
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionOne;
