import http from "./httpService";
import { apiURL } from "../config";

const apiEndpoint = apiURL + "/api/searchResults";

export async function getCompanyNamesAndJobTitles(term) {
  console.log(apiEndpoint + `/getCompanyNamesAndJobTitles/${term}`);
  return await http.get(apiEndpoint + `/getCompanyNamesAndJobTitles/${term}`);
}

export async function getCompanyNames(term) {
  return await http.get(apiEndpoint + `/getCompanyNames/${term}`);
}

export async function getJobTitles(term) {
  return await http.get(apiEndpoint + `/getJobTitles/${term}`);
}

export async function getLocations(term) {
  return await http.get(apiEndpoint + `/getLocations/${term}`);
}

export async function getReviews(companyNameOrJobTitle, location) {
  const payload = {};
  if (companyNameOrJobTitle) {
    payload.companyNameOrJobTitle = companyNameOrJobTitle;
  }
  if (location) {
    payload.location = location;
  }
  // const payload = { companyNameOrJobTitle, location };
  console.log("Payload1: ", payload);
  return await http.get(apiEndpoint + `/getReviews`, { params: payload });
}

export async function getSalaryReviewsMainData(jobTitle, location) {
  const payload = {};
  if (jobTitle) {
    payload.jobTitle = jobTitle;
  }
  if (location) {
    payload.location = location;
  }
  return await http.get(apiEndpoint + `/getSalaryReviewsMainData`, {
    params: payload,
  });
}

export async function getSalaryReviewsRankedJobs(jobTitle, location) {
  const payload = {};
  if (jobTitle) {
    payload.jobTitle = jobTitle;
  }
  if (location) {
    payload.location = location;
  }
  return await http.get(apiEndpoint + `/getSalaryReviewsRankedJobs`, {
    params: payload,
  });
}
