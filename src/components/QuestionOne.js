import React from "react";

class QuestionOne extends React.Component {
  constructor() {
    super();
  }

  render() {
    let answerOne = this.props.inputPosts
      ? `If you have ${this.props.inputPosts} posts then you will need ${
          this.props.panelsNeeded
        } panels`
      : null;

    return (
      <div>
        <h1>Question One!</h1>

        <h2>How many panels should I buy so all my posts are used up?</h2>
        <p>Please enter the number of posts you have:</p>
        <input
          type="text"
          name="posts"
          onChange={this.props.handlePostChange}
        />
        <div className="answer-one">{answerOne}</div>
      </div>
    );
  }
}

export default QuestionOne;
