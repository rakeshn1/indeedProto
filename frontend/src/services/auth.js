
import http from "./httpService";

import { apiURL } from "../config";

const apiEndpoint = apiURL + "/auth";


export async function addAccount(payload) {
    // console.log(apiURL + "/api/handleJobSaveUnsave/")
    console.log("payload", payload)
    return await http.post(apiEndpoint + `/addAccount/`, payload);
}