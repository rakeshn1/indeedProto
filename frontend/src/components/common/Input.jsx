import React from "react";

class Input extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <input type="text" {...this.props}></input>
      </div>
    );
  }
}

export default Input;
