import React from "react";

class QuestionTwo extends React.Component {
  render() {
    let answerTwo = this.props.inputLength
      ? `If you want a post ${this.props.inputLength}m long, you will need ${
          this.props.postsNeeded
        } \
      posts and ${this.props.panelsNeeded} panels. This gives you a length of ${
          this.props.totalLength
        }m`
      : null;
    return (
      <div>
        <h1>Question Two!</h1>
        <h2>
          Q2: How many posts and panels do I need to make a fence of length Z?
        </h2>
        <p>Please enter the length you would like:</p>
        <input
          type="text"
          name="length"
          onChange={this.props.handleLengthChange}
        />
        {this.props.inputLength && (
          <div className="answer-two">
            {answerTwo}
            <br />
            <br />
            <button type="submit" onClick={this.props.handleSaveQ2}>
              Save result
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionTwo;
