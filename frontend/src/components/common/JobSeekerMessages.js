import React from "react";
import RecipientsJobSeekerCard from "./RecipientsJobSeekerCard";
import { useEffect, useState } from "react";
import { getCurrentUser, getJwt } from "../../services/auth";
import axios from "axios";
const JobSeekerMessagesLandingPage = () => {
    const user = getCurrentUser();
    const [recipients, setRecipients] = useState([
        {
            name: "NCR",
        },
    ]);
    useEffect(() => {
        console.log("--*--", user)
        axios
            .get(
                `http://localhost:3900/employer/api/getAllConversationsJobSeeker/${user._id}`,
                {}
            )
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    alert({ html: response.statusText, classes: "#c62828 red darken-3" });
                } else {
                    setRecipients(response.data);
                    console.log(response.data);
                }
            });
    }, []);
    return (
        <div className="container job-search-wrapper">
            <RecipientsJobSeekerCard data={recipients} />
        </div>
    );
};

export default JobSeekerMessagesLandingPage;
