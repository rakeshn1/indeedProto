import React from "react";
import { format } from "date-fns";
import StarRating from "react-svg-star-rating";
import { updateReview } from "../../../services/jobSeeker";

class ReviewCard extends React.Component {
  state = {
    isMarked: false,
    isMarkedAsHelpful: false,
    isMarkedAsNotHelpful: false,
  };

  handleHelpfulnessScore = (e) => {
    this.setState({ isMarked: true });
    if (e.target.id == "isHelpful") {
      this.setState({ isMarkedAsHelpful: true });
      updateReview(this.props.reviewId, true);
    } else {
      this.setState({ isMarkedAsNotHelpful: true });
      updateReview(this.props.reviewId, false);
    }
    console.log(e.target.id);
  };

  render() {
    return (
      <div>
        <div className="d-flex flex-row justify-start p-3">
          <div style={{ minWidth: "50px", textAlign: "center" }}>
            <h4 style={{ marginBottom: "-5px" }}>{this.props.rating}</h4>
            <StarRating
              size={10}
              initialRating={this.props.rating}
              isReadOnly={true}
              activeColor={"#9d2b6b"}
            />
          </div>
          <div className="d-flex flex-column ps-4">
            <h4>{this.props.reviewSummary}</h4>
            <span style={{ fontSize: "12px" }}>
              {this.props.role} - {this.props.city}, {this.props.state ?? `USA`}{" "}
              - {this.props.reviewedOn}
            </span>
            {this.props.status === 2 && (
              <div className="featured-review">
                <p style={{ marginBottom: 0 }}>
                  <b>Indeed Featured review</b>
                </p>
                <span>The most useful review selected by Indeed</span>
              </div>
            )}
            <span style={{ fontSize: "14px" }} className="pt-3">
              {this.props.review}
            </span>
            <span
              style={{ fontSize: "14px", fontWeight: 700 }}
              className="pt-2"
            >
              <i
                class="fa fa-check"
                aria-hidden="true"
                style={{ color: "green", paddingRight: "5px" }}
              ></i>
              Pros
            </span>
            <span style={{ fontSize: "14px" }} className="pb-1">
              {this.props.pros}
            </span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>
              <i
                class="fa fa-times"
                aria-hidden="true"
                style={{ color: "red", paddingRight: "5px" }}
              ></i>
              Cons
            </span>
            <span style={{ fontSize: "14px" }} className="pb-1">
              {this.props.cons}
            </span>
            {this.props.showHelpfulness && (
              <div>
                <span style={{ fontSize: "12px" }} className="pt-2">
                  Was this review helpful?
                </span>
                <div onClick={this.handleHelpfulnessScore}>
                  <button
                    className="review-button"
                    id="isHelpful"
                    disabled={this.state.isMarked}
                  >
                    Yes{" "}
                    {this.state.isMarkedAsHelpful
                      ? this.props.markedAsHelpful + 1
                      : this.props.markedAsHelpful}
                  </button>
                  <button
                    className="review-button"
                    id="notHelpful"
                    disabled={this.state.isMarked}
                  >
                    No{" "}
                    {this.state.isMarkedAsNotHelpful
                      ? this.props.markedAsNotHelpful + 1
                      : this.props.markedAsNotHelpful}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewCard;
