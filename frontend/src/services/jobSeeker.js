//  All api calls can be written here

import http from "./httpService";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/jobSeeker";

export async function addReview(review) {
  const result = {
    jobSeekerId: "6174aeb47623fc4a4f1a6bb0",
    companyId: "6174aeb47623fc4a4f1a6bb1",
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

export async function getCompanyReviews(id) {
  return await http.get(apiURL + `/api/getCompanyReviews/${id}`);
}

export async function getJobSearchResults(payload) {
  console.log(apiURL + "/api/getJobSearchResults/")
  console.log("payload", payload)
  return await http.get(apiEndpoint + `/getJobSearchResults/`, { params: payload });
}


export async function handleJobSaveUnsave(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload)
  return await http.put(apiEndpoint + `/handleJobSaveUnsave/${payload.userId}`, { jobId: payload.jobId });
}


export async function getSavedJobs(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload)
  return await http.get(apiEndpoint + `/getSavedJobs/${payload.userId}`);
}

export async function getJobSeekerDetails(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload)
  return await http.get(apiEndpoint + `/getJobSeekerDetails/${payload.userId}`);
}

export async function updateJobSeekerDetails(userId, payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload)
  return await http.put(apiEndpoint + `/updateJobSeekerDetails/${userId}`, payload);
}

export async function applyJob(payload) {
  console.log("payload", payload);
  return await http.post(apiEndpoint + `/applyJob/`, payload);
}


