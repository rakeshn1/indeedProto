import http from "./httpService";
import jwtDecode from "jwt-decode";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/auth";

const tokenKey = "token.indeed";

export async function addAccount(payload) {
  // console.log(apiURL + "/api/handleJobSaveUnsave/")
  console.log("payload", payload);
  return await http.post(apiEndpoint + `/addAccount/`, payload);
}

export function logout() {
  console.log("logout called");
  localStorage.removeItem(tokenKey);
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

export function getCurrentUser() {
  //actual code
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("RETURNING DATA");
    return jwtDecode(jwt);
  } catch (ex) {
    console.log("RETURNING NULL");
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
