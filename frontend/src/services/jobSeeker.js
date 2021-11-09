//  All api calls can be written here

import http from "./httpService";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/jobSeeker";

export async function addReview(review) {
  debugger;
  return await http.post(apiEndpoint + "/addReview", {
    jobSeekerId: 1,
    companyId: 1,
    rating: review.overallRating,
    workLifeBal: review.workLifeBal,
    jobSecurity: review.jobSecurity,
    management: review.management,
    culture: review.culture,
    benefits: review.benefits,
    reviewSummary: review.reviewSummary,
    review: review.review,
    pros: review.pros,
    cons: review.cons,
    jobTitle: review.jobTitle,
    jobLocation: review.jobLocation,
    CEOApproval: review.ceoApproval,
    howShouldIPrepare: review.tips,
    status: 0,
  });
}
