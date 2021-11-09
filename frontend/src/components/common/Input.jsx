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
          {this.props.required && <span className="required">*</span>}
        </p>
        <input type="text" {...this.props}></input>
      </div>
    );
  }
}

export default Input;
