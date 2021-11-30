//  All api calls can be written here

import http from "./httpService";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/jobSeeker";

export async function addReview(review) {
  const result = {
    jobSeekerId: "6174aeb47623fc4a4f1a6bb0",
    companyId: "619ebb543ee1aa8bb08188a3",
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
  };
  return await http.post(apiEndpoint + "/addReview", result);
}

export async function getCompanyReviews(id, params) {
  return await http.get(apiEndpoint + `/getReviews/${id}`, { params: params });
}

export async function getCompanyDetails(id) {
  return await http.get(apiURL + `/employer/api/getCompanyDetails/${id}`);
}

export async function getJobPostings(id) {
  return await http.get(apiURL + `/employer/api/getCompanyJobs/${id}`);
}

export async function updateReview(reviewid, isHelpful) {
  return await http.put(apiEndpoint + `/updateReview/${reviewid}`, {
    isHelpful,
  });
}

export async function getJobSearchResults(payload) {
  console.log(apiURL + "/api/getJobSearchResults/");
  console.log("payload", payload);
  return await http.get(apiURL + `/getJobSearchResults/`, { params: payload });
}
