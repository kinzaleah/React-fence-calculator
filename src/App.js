import React, { Component } from "react";
import QuestionOne from "./components/QuestionOne";
import QuestionTwo from "./components/QuestionTwo";
import QuestionThree from "./components/QuestionThree";
import WidthInput from "./components/WidthInput";
import SavedCalculations from "./components/SavedCalculations";

import "./App.css";

let postWidth = 1;
let panelWidth = 4;

class App extends Component {
  constructor() {
    super();
    let savedCalculations =
      JSON.parse(localStorage.getItem("savedCalculations")) || [];

    savedCalculations = savedCalculations.map(calc => {
      calc.timestamp = new Date(calc.timestamp);
      return calc;
    });

    this.state = {
      postWidth: postWidth,
      panelWidth: panelWidth,
      q1Posts: null,
      q1PanelsNeeded: null,

      q2Panels: null,
      q2PostsNeeded: null,
      q2PanelsNeeded: null,
      q2Length: null,
      q2OverTotal: null,

      q3Posts: null,
      q3Panels: null,
      q3Length: null,
      q3LeftoverPosts: null,
      q3LeftoverPanels: null,
      savedCalculations
    };

    this.handlePostChange = this.handlePostChange.bind(this);
    this.calculatePanelsForPosts = this.calculatePanelsForPosts.bind(this);
    this.calculatePostsForPanels = this.calculatePostsForPanels.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleBiggestFenceChange = this.handleBiggestFenceChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.calculateQ3Answer = this.calculateQ3Answer.bind(this);
    this.displayQ3Answer = this.displayQ3Answer.bind(this);
    this.handleSaveQ1 = this.handleSaveQ1.bind(this);
    this.handleSaveQ2 = this.handleSaveQ2.bind(this);
    this.handleSaveQ3 = this.handleSaveQ3.bind(this);
    this.saveCalculation = this.saveCalculation.bind(this);
    this.removeSavedCalculations = this.removeSavedCalculations.bind(this);
  }

  handleSaveQ1(event) {
    let answer = {
      q: 1,
      q1InputPosts: this.state.q1Posts,
      q1PanelsNeeded: this.state.q1PanelsNeeded,
      timestamp: new Date()
    };

    this.saveCalculation(answer);
  }

  handleSaveQ2(event) {
    let answer = {
      q: 2,
      q2InputLength: this.state.q2Length,
      q2PostsNeeded: this.state.q2PostsNeeded,
      q2PanelsNeeded: this.state.q2PanelsNeeded,
      q2OutputLength: this.state.q2OverTotal,
      q2PostWidth: this.state.postWidth,
      q2PanelWidth: this.state.panelWidth,
      timestamp: new Date()
    };

    this.saveCalculation(answer);
  }

  handleSaveQ3(event) {
    let results = this.calculateQ3Answer();

    let answer = {
      q: 3,
      q3InputPosts: this.state.q3Posts,
      q3InputPanels: this.state.q3Panels,
      q3Length: results.length,
      q3LeftoverPosts: results.leftoverPosts,
      q3LeftoverPanels: results.leftoverPanels,
      q3PostWidth: this.state.postWidth,
      q3PanelWidth: this.state.panelWidth,
      timestamp: new Date()
    };

    this.saveCalculation(answer);
  }

  saveCalculation(answer) {
    const key = "savedCalculations";
    const newSavedCalculations = [...this.state.savedCalculations, answer];

    localStorage.setItem(key, JSON.stringify(newSavedCalculations));

    this.setState(() => ({
      [key]: newSavedCalculations
    }));
  }

  removeSavedCalculations() {
    localStorage.removeItem("savedCalculations");

    this.setState({
      savedCalculations: []
    });
  }

  calculatePanelsForPosts(posts) {
    return posts - 1;
  }

  calculatePostsForPanels(panels) {
    return panels + 1;
  }

  handlePostChange(event) {
    const calculatePanels = posts => {
      let panels = posts - 1;

      return panels;
    };

    const posts = parseInt(event.target.value);

    this.setState({
      q1PanelsNeeded: calculatePanels(posts),
      q1Posts: posts
    });
  }

  handleLengthChange(event) {
    let length = parseInt(event.target.value);
    let postWidth = this.state.postWidth;
    let panelWidth = this.state.panelWidth;

    //  the number of panels should dictate how many posts as they're bigger
    // so if i have 14 panels then i need 15 posts. though this would take it over the max.

    let numPanels = 0;
    let numPosts = 1;

    // starts with 1 post so the length will start as that
    let constructedLength = postWidth;

    // loop through increase panels & constructedLength each time until you reach the length input
    while (constructedLength < length) {
      numPanels++;
      constructedLength += postWidth + panelWidth;
    }

    let underPanels = numPanels - 1;
    let overPanels = numPanels;

    let underTotal = underPanels * panelWidth + (underPanels + 1) * postWidth;
    let overTotal = overPanels * panelWidth + (overPanels + 1) * postWidth;

    this.setState({
      q2Length: length,
      q2PostsNeeded: overPanels + 1,
      q2PanelsNeeded: numPanels,
      q2OverTotal: overTotal
    });
  }

  handleWidthChange(event) {
    const { name } = event.target;
    let value;

    if (name === "postWidth") {
      value = parseInt(event.target.value || postWidth);
    } else {
      value = parseInt(event.target.value || panelWidth);
    }

    this.setState({
      [name]: value
    });
  }

  calculateQ3Answer() {
    let inputPosts = this.state.q3Posts;
    let inputPanels = this.state.q3Panels;

    let postWidth = this.state.postWidth;
    let panelWidth = this.state.panelWidth;

    let length;
    let leftoverPanels = 0;
    let leftoverPosts = 0;

    if (!inputPosts || !inputPanels) {
      return "";
    }

    // posts must be 1 longer than panel & 2 posts to even do it
    if (inputPosts < 2 || inputPanels < 1) {
      length = 0;
    }

    if (inputPanels >= inputPosts) {
      // TOO MANY PANELS
      let numPanels = inputPosts - 1;

      length = inputPosts * postWidth + numPanels * panelWidth;
      leftoverPanels = inputPanels - numPanels;
    } else {
      // TOO MANY POSTS
      let numPosts = inputPanels + 1;

      length = numPosts * postWidth + inputPanels * panelWidth;
      leftoverPosts = inputPosts - numPosts;
    }

    return {
      length,
      leftoverPanels,
      leftoverPosts
    };
  }

  displayQ3Answer() {
    const { length, leftoverPanels, leftoverPosts } = this.calculateQ3Answer();

    return `
      You can make a fence ${length}m long. 
      You will have ${leftoverPanels} panels and ${leftoverPosts} posts remaining.`;
  }

  handleBiggestFenceChange(event) {
    const { name } = event.target;

    const value = parseInt(event.target.value);

    this.setState({
      [name]: value || 0
    });
  }

  render() {
    return (
      <div className="container" style={{ padding: "30px" }}>
        <div>
          <h1>Javascript Fence Calculator</h1>

          <WidthInput
            handleWidthChange={this.handleWidthChange}
            panelWidth={this.state.panelWidth}
            postWidth={this.state.postWidth}
          />

          <QuestionOne
            inputPosts={this.state.q1Posts}
            panelsNeeded={this.state.q1PanelsNeeded}
            handlePostChange={this.handlePostChange}
            handleSaveQ1={this.handleSaveQ1}
          />

          <QuestionTwo
            inputLength={this.state.q2Length}
            postsNeeded={this.state.q2PostsNeeded}
            panelsNeeded={this.state.q2PanelsNeeded}
            totalLength={this.state.q2OverTotal}
            handleLengthChange={this.handleLengthChange}
            handleSaveQ2={this.handleSaveQ2}
          />

          <QuestionThree
            inputPosts={this.state.q3Posts}
            inputPanels={this.state.q3Panels}
            totalLength={this.state.q3Length}
            leftoverPanels={this.state.q3LeftoverPanels}
            leftoverPosts={this.state.q3LeftoverPosts}
            handleBiggestFenceChange={this.handleBiggestFenceChange}
            displayQ3Answer={this.displayQ3Answer}
            handleSaveQ3={this.handleSaveQ3}
          />
        </div>
        <div>
          <SavedCalculations
            savedCalculations={this.state.savedCalculations}
            removeSavedCalculations={this.removeSavedCalculations}
          />
        </div>
      </div>
    );
  }
}

export default App;
