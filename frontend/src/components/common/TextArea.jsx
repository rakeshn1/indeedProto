import React from "react";

class TextArea extends React.Component {
  render() {
    return (
      <div>
        <p className="question-label">
          <b>{this.props.label}</b>
        </p>
        <textarea {...this.props} />
      </div>
    );
  }
}

export default TextArea;
