import React from "react";

class WidthInput extends React.Component {
  render() {
    return (
      <div>
        Post width:
        <input
          type="text"
          name="postWidth"
          onChange={this.props.handleWidthChange}
        />{" "}
        <br />
        Panel width:
        <input
          type="text"
          name="panelWidth"
          onChange={this.props.handleWidthChange}
        />
        <p>
          Currently, the post width is {this.props.postWidth}m and panel width
          is {this.props.panelWidth}m.
        </p>
      </div>
    );
  }
}

export default WidthInput;
