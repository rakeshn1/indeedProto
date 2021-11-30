import React from "react";
import { format } from "date-fns";
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
      // updateReview(this.props.reviewId, true);
      updateReview("619dbb411dbfad55f814f4df", true);
    } else {
      this.setState({ isMarkedAsNotHelpful: true });
      // updateReview(this.props.reviewId, false);
      updateReview("619dbb411dbfad55f814f4df", false);
    }
    console.log(e.target.id);
  };

  render() {
    return (
      <div>
        <div className="d-flex flex-row justify-content-between p-3">
          <h4>{this.props.rating}</h4>
          <div className="d-flex flex-column ps-4">
            <h4>Great place to work!</h4>
            <span style={{ fontSize: "12px" }}>
              {this.props.role} (Former Employee) - {this.props.city},{" "}
              {this.props.state} - {this.props.reviewedOn}
            </span>
            <span style={{ fontSize: "14px" }} className="pt-3">
              At-Home (Remote) AppleCare Senior Level Technical Advisor (Former
              Employee) - Pensacola, FL - November 18, 2020 Working at Apple was
              a great experience. Work never felt like work because I loved what
              I did and I loved interacting with the public. The store was
              always electric, although others may say crazy. I'd say electric
              because the experience was exhilarating. The managers were all
              great and they were never above doing what they asked of their
              employees. The benefits and pay were amazing for a part time job.
              Working for a company with a brand such as Apple and experience to
              match that brand made me want to stay forever. This is a job I
              truly miss and I am thankful for the opportunity that I was given!
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
              {this.props.pros}
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
