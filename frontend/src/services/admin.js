//  All api calls can be written here
import http from "./httpService";
// import jwtDecode from "jwt-decode";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/admin";

// const tokenKey = "token.indeed";

export async function getNumberOfReviewsPerDay() {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  // console.log("payload")
  return await http.get(apiEndpoint + `/numberOfReviewsPerDay`);
}

export async function getTopfiveReviewedCompanies() {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  // console.log("payload")
  return await http.get(apiEndpoint + `/topfiveReviewedCompanies`);
}

export async function topfiveJobSeekersBasedOnAcceptedReviews() {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  // console.log("payload")
  return await http.get(
    apiEndpoint + `/topfiveJobSeekersBasedOnAcceptedReviews`
  );
}

// export async function topFiveCompaniesBasedOnAverageRating() {
//     // console.log(apiURL + "/api/handleJobSaveUnsave/")
//     // console.log("payload")
//     return await http.get(apiEndpoint + `/numberOfReviewsPerDay`);
// }

export async function topTenCeosApproved() {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  // console.log("payload")
  return await http.get(apiEndpoint + `/topTenCeosApproved`);
}
export async function getListOfAllReviewsExceptUnApproved(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(
    apiEndpoint + `/getListOfAllReviewsExceptUnApproved/${payload.companyId}`
  );
}

export async function getJobStats(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.get(apiEndpoint + `/getJobStats/${payload.companyId}`);
}

export async function getAllUnapprovedReviews() {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  // console.log("payload")
  return await http.get(apiEndpoint + `/getUnapprovedReviews`);
}
export async function updateReviewStatus(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload123123123", payload);
  return await http.post(apiEndpoint + `/updateStatusOfReview`, payload);
}

export async function topFiveCompaniesBasedOnAverageRating() {
  return await http.get(apiEndpoint + `/topFiveCompaniesBasedOnAverageRating`);
}

export async function updatePhotoStatus(payload) {
  return await http.put(apiEndpoint + `/updateStatusOfPhoto`, payload);
}
export async function getAllCompanies() {
  return await http.get(apiEndpoint + `/getAllCompanies`);
}
export async function getAllPhotos() {
  return await http.get(apiEndpoint + `/getAllPhotos`);
}

export async function insertPhoto(payload) {
  return await http.post(apiEndpoint + `/insertPhoto`, payload);
}

export async function getViewCount() {
  return await http.get(apiEndpoint + `/getViewCount`);
}
export async function incrementViewCount(payload) {
  console.log("payloaddddgegh: ", payload);
  payload.date = getDateInFormat(payload.date);
  console.log("Formated date: ", payload.date);
  return await http.post(apiEndpoint + "/incrementViewCount", payload);
}

const getDateInFormat = (date) => {
  let year = date.getFullYear().toString();
  let month = date.getMonth().toString();
  let day = date.getDate().toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
};
