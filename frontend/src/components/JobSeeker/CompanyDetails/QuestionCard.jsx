import React from "react";

class QuestionCard extends React.Component {
  render() {
    return (
      <div>
        <h5 className="mt-3, mb-3" style={{ textAlign: "left" }}>
          {this.props.question}
        </h5>
        <div>{this.props.content}</div>
      </div>
    );
  }
}

export default QuestionCard;
