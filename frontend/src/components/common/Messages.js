import React from "react";
import RecipientsCard from "./RecipientsCard";
import { useEffect, useState } from "react";
import { TextField, ListItemText, Grid, MenuItem } from "@material-ui/core";
import axios from "axios";
const MessagesLandingPage = () => {
  const [recipients, setRecipients] = useState([
    {
      userName: "Vineeth",
    },
  ]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3900/employer/api/getAllConversations/619d46a4c6f3fa96b4f6cb5e",
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
