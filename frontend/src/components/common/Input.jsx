import React from "react";

class Input extends React.Component {
  render() {
    return (
      <div>
        <p
          className={
            this.props.labelclass ? this.props.labelclass : "question-label"
          }
        >
          {this.props.label}
        </p>
        <input type="text" {...this.props}></input>
      </div>
    );
  }
}

export default Input;
