import React from "react";

class TextArea extends React.Component {
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
        <textarea {...this.props} />
      </div>
    );
  }
}

export default TextArea;
