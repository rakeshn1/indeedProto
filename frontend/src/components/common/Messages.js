import React from "react";
import RecipientsCard from "./RecipientsCard";
import { useEffect, useState } from "react";
import { getCurrentUser, getJwt } from "../../services/auth";
import axios from "axios";
const MessagesLandingPage = () => {
    const user = getCurrentUser();
    const [recipients, setRecipients] = useState([
        {
            userName: "Vineeth",
        },
    ]);
    useEffect(() => {
        axios
            .get(
                `http://localhost:3900/employer/api/getAllConversations/${user.companyId}`,
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
            <RecipientsCard data={recipients} />
        </div>
    );
};

export default MessagesLandingPage;
