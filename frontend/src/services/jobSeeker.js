//  All api calls can be written here

import http from "./httpService";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/jobSeeker";

export async function addReview(review, companyId, jobSeekerId) {
  const result = {
    jobSeekerId: jobSeekerId,
    companyId: companyId,
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
    state: review.state,
    status: 0,
  };
  return await http.post(apiEndpoint + "/addReview", result);
}

export async function addSalaryReview(salary, companyId) {
  return await http.post(apiEndpoint + `/addSalaryReview/${companyId}`, salary);
}

export async function getCompanyReviews(id, params) {
  return await http.get(apiEndpoint + `/getReviews/${id}`, { params: params });
}

export async function getJobSeekerReviews(id) {
  return await http.get(apiEndpoint + `/getJobSeekerReviews/${id}`, {});
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

export async function getSalaryReviews(companyId, jobTitle, jobLocation) {
  return await http.get(apiEndpoint + `/getSalaryReviews/${companyId}`, {
    params: { jobTitle, jobLocation },
  });
}
export async function getSalaryJobTitles(companyId, jobLocation) {
  return await http.get(apiEndpoint + `/getSalaryReviews/jobTitles/${companyId}`, {
    params: { jobLocation },
  });
}
export async function getSalaryJobLocations(companyId, jobTitle) {
  return await http.get(apiEndpoint + `/getSalaryReviews/jobLocations/${companyId}`, {
    params: { jobTitle },
  });
}

export async function getJobSearchResults(payload) {
  console.log(apiURL + "/api/getJobSearchResults/");
  console.log("payload", payload);
  return await http.get(apiEndpoint + `/getJobSearchResults/`, {
    params: payload,
  });
}

export async function handleJobSaveUnsave(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.put(
    apiEndpoint + `/handleJobSaveUnsave/${payload.userId}`,
    { jobId: payload.jobId }
  );
}

export async function getSavedJobs(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(apiEndpoint + `/getSavedJobs/${payload.userId}`);
}

export async function getSavedJobsWithDesc(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(
    apiEndpoint + `/getSavedJobsWithDesc/${payload.userId}`
  );
}

export async function getAppliedJobs(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(apiEndpoint + `/getAppliedJobs/${payload.userId}`);
}

export async function getAppliedJobsWithDesc(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(
    apiEndpoint + `/getAppliedJobsWithDesc/${payload.userId}`
  );
}

export async function getJobSeekerDetails(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(apiEndpoint + `/getJobSeekerDetails/${payload.userId}`);
}

export async function updateJobSeekerDetails(userId, payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.put(
    apiEndpoint + `/updateJobSeekerDetails/${userId}`,
    payload
  );
}

export async function applyJob(payload) {
  console.log("payload", payload);
  return await http.post(apiEndpoint + `/applyJob/`, payload);
}

export async function getCompanyratings(id) {
  return await http.get(apiEndpoint + `/getRatings/${id}`);
}
export async function getTotalReviews(id) {
  return await http.get(apiEndpoint + `/getTotalReviews/${id}`);
}
