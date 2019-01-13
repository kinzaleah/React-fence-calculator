import React, { Component } from 'react';

import './App.css';

let postWidth = 1;
let panelWidth = 4;

class App extends Component {
  constructor(){
    super()
    this.state={
      q1Posts: null,
      q1PanelsNeeded: null,
      q2Panels: null,
      q2PostsNeeded: null,
      q2PanelsNeeded: null,
      q2Length: null,
      q2OverTotal: null,
      q3Posts: null,
      q3Panels: null,
      q3PostWidth: postWidth,
      q3PanelWidth: panelWidth,
      q3Length: null,
      q3LeftoverPosts: null,
      q3LeftoverPanels: null
    }

    this.handlePostChange = this.handlePostChange.bind(this);
    this.calculatePanelsForPosts = this.calculatePanelsForPosts.bind(this);
    this.calculatePostsForPanels = this.calculatePostsForPanels.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleBiggestFenceChange = this.handleBiggestFenceChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.calculateQ3Answer = this.calculateQ3Answer.bind(this);
  }

  calculatePanelsForPosts(posts) { 
    return posts - 1;
  };

  calculatePostsForPanels(panels) { 
    return panels + 1;
  };

  handlePostChange(event){
    const calculatePanels = posts => {
      let panels = posts - 1;
                     
      return panels;
    };
    
    const posts = parseInt(event.target.value)

    this.setState({
      q1PanelsNeeded: calculatePanels(posts),
      q1Posts: posts
    })
  }

  handleLengthChange(event){

    let length = parseInt(event.target.value);

      //  the number of panels should dictate how many posts as they're bigger
      // so if i have 14 panels then i need 15 posts. though this would take it over the max.
      
      let numPanels = 0;
      let numPosts = 1;
      
    
      // starts with 1 post so the length will start as that
      let constructedLength = postWidth;

      // loop through increase panels & constructedLength each time until you reach the length input
      while(constructedLength < length ){
          numPanels++;
          console.log(numPanels);   
                              
          constructedLength += (postWidth + panelWidth);
          console.log(constructedLength);  
          
      }

      let underPanels = numPanels-1;
      let overPanels = numPanels;

          
      let underTotal = (underPanels * panelWidth) + ((underPanels +1) * postWidth);
      let overTotal = (overPanels * panelWidth) + ((overPanels +1) * postWidth);

   
      this.setState(
        {
          q2Length: length,
          q2PostsNeeded: overPanels +1,
          q2PanelsNeeded: numPanels,
          q2OverTotal: overTotal
          
        }
      )
  }

  handleWidthChange(event){
    const { name } = event.target ;
    let value

    if(name === "q3PostWidth"){
      value = parseInt(event.target.value || postWidth);
    } else {
      value = parseInt(event.target.value || panelWidth);
    }
    

    this.setState({
      [name]: value
    })
  }

  calculateQ3Answer() {
    let inputPosts = this.state.q3Posts;
    let inputPanels = this.state.q3Panels;

    let postWidth = this.state.q3PostWidth;
    let panelWidth = this.state.q3PanelWidth;

    let length;
    let leftoverPanels = 0;
    let leftoverPosts = 0;

    if (!inputPosts || !inputPanels) {
      return ''
    }

    // posts must be 1 longer than panel & 2 posts to even do it
    if(inputPosts < 2 || inputPanels < 1){
        length = 0;
    }

    if(inputPanels >= inputPosts){
        
        // TOO MANY PANELS

        let numPanels = inputPosts - 1;

        length = (inputPosts * postWidth) + (numPanels * panelWidth);
        leftoverPanels = inputPanels - numPanels;
        
    } else {
        // TOO MANY POSTS

        let numPosts = inputPanels + 1;

        length = (numPosts * postWidth) + (inputPanels * panelWidth);
        leftoverPosts = inputPosts - numPosts;
    }

    return `
      You can make a fence ${length}m long. 
      You will have ${leftoverPanels} panels and ${leftoverPosts} posts remaining.`
  }

  handleBiggestFenceChange(event){

    const { name } = event.target ;

    const value = parseInt(event.target.value);

    this.setState({
      [name]: value || 0,
    })

    return

    let inputPosts = this.state.q3Posts;
    let inputPanels = this.state.q3Panels;

    let postWidth = this.state.q3PostWidth ;
    let panelWidth = this.state.q3PanelWidth ;

    let length;
    let leftoverPanels = 0;
    let leftoverPosts = 0;

    // posts must be 1 longer than panel & 2 posts to even do it
    if(inputPosts < 2 || inputPanels < 1){
        length = 0;
    }

    if(inputPanels >= inputPosts){
        
        // TOO MANY PANELS

        let numPanels = inputPosts - 1;

        length = (inputPosts * postWidth) + (numPanels * panelWidth);
        leftoverPanels = inputPanels - numPanels;
        

    } else {
        // TOO MANY POSTS

        let numPosts = inputPanels + 1;

        length = (numPosts * postWidth) + (inputPanels * panelWidth);
        leftoverPosts = inputPosts - numPosts;
    }

    this.setState({
      q3Length: length,
      q3LeftoverPanels: leftoverPanels,
      q3LeftoverPosts: leftoverPosts
    })
  }

  render(){

    let answerOne = this.state.q1Posts 
      ? `If you have ${this.state.q1Posts} posts then you will need ${this.state.q1PanelsNeeded} panels`
      : null ; 
    let answerTwo = this.state.q2Length
      ? `If you want a post ${this.state.q2Length}m long, you will need ${this.state.q2PostsNeeded} \
      posts and ${this.state.q2PanelsNeeded} panels. This gives you a length of ${this.state.q2OverTotal}m` 
      : null ; 
    let answerThree = this.state.q3Posts && this.state.q3Panels ? `
      Post width: ${this.state.q3PostWidth}m 
      Panel width: ${this.state.q3PanelWidth}m 
      You can make a fence ${this.state.q3Length}m long. You will have ${this.state.q3LeftoverPanels} panels and ${this.state.q3LeftoverPosts} posts remaining.
    `: null;

    return(
      <div style={{padding:'30px'}}>
        <h1>Javascript Fence Calculator</h1>
        <h2>Q1: How many panels should I buy so all my posts are used up?</h2>
       
        <p>Please enter the number of posts you have:</p>
        <input type='text' name ='posts' onChange={this.handlePostChange}/>
        
        <div className='answer-one'>{answerOne}</div>
        

    
        <h2>Q2: How many posts and panels do I need to make a fence of length Z?</h2>

        <p>Please enter the length you would like:</p>
        <input type='text' name ='length' onChange={this.handleLengthChange}/>
        
        <div className='answer-two'>{answerTwo}</div>

        <h2>Q3: What’s the biggest fence I can make?</h2>

       
        <p>Please enter how many posts and panels you have:</p>
        Posts: 
        <input type='text' name ='q3Posts' onChange={this.handleBiggestFenceChange}/>
        Post width:
        <input type='text' name ='q3PostWidth' onChange={this.handleWidthChange}/>
        <br/>
        
        
        Panels: 
        <input type='text' name ='q3Panels' onChange={this.handleBiggestFenceChange}/>
        Panel width:
        <input type='text' name ='q3PanelWidth' onChange={this.handleWidthChange}/>
        <br/>
        
        <div className='answer-three'>{this.calculateQ3Answer()}</div>
      </div>
    )
  }
}


export default App;
