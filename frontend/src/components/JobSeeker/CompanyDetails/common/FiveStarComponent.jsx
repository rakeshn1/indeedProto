import React from "react";

class FiveStarComponent extends React.Component {
  submitReview = (e) => {
    // console.log();
    this.props.onReview(e.target.id);
  };
  render() {
    return (
      <div>
        <div onClick={this.submitReview}>
          <button className="invisibleButton">
            <i
              class="fa fa-star-o fa-2x"
              aria-hidden="true"
              id="1"
              value="1"
            ></i>
          </button>
          <button className="invisibleButton">
            <i
              class="fa fa-star-o fa-2x"
              aria-hidden="true"
              id="2"
              value="2"
            ></i>
          </button>
          <button className="invisibleButton">
            <i
              class="fa fa-star-o fa-2x"
              aria-hidden="true"
              id="3"
              value="3"
            ></i>
          </button>
          <button className="invisibleButton">
            <i
              class="fa fa-star-o fa-2x"
              aria-hidden="true"
              id="4"
              value="4"
            ></i>
          </button>
          <button className="invisibleButton">
            <i
              class="fa fa-star-o fa-2x"
              aria-hidden="true"
              id="5"
              value="5"
            ></i>
          </button>
        </div>
      </div>
    );
  }
}

export default FiveStarComponent;
