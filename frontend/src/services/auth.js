import http from "./httpService";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/auth";

const tokenKey = "token.indeed";

export async function addAccount(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.post(apiEndpoint + `/addAccount/`, payload);
}

export async function login(email, password) {
  try {
    const response = await http.post(apiEndpoint + `/login`, {
      email,
      password,
    });
    if (response && response.status === 200) {
      const jwt = response.data;
      localStorage.setItem(tokenKey, jwt);
      return true;
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      return false;
    }
  }
}
