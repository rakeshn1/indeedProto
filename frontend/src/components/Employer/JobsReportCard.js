import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, ListItemText, Grid, MenuItem } from "@material-ui/core";
import axios from "axios";
import Button from "../common/Button";
import EmployerReport from "../common/EmployerReport"
import Chart from "../Admin/Chart";
import {apiURL} from '../../config'
const JobsReportCard = (props) => {
    const [open, setOpen] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [labels, setLabels] = useState([]);
    const data = props.data;




    const handleOpen = (job) => {
        axios.get(`${apiURL}/employer/api/getApplicationDetails/${job._id}`)
            .then((response) => {
                if (response.status != 200) {
                    console.log("yyyy")
                    // M.toast({ html: response.data.statusText, classes: "#c62828 red darken-3" })
                } else {
                    var submitted = 0
                    var reviewed = 0
                    var initialScreening = 0
                    var interviewing = 0
                    var hired = 0
                    var rejected = 0
                    var total = 0
                    for (let i = 0; i < response.data[0].length; i++) {
                        if (response.data[0][i].status == 1) {
                            submitted = submitted + 1
                        }
                        if (response.data[0][i].reviewed == 2) {
                            reviewed = reviewed + 1
                        }
                        if (response.data[0][i].status == 3) {
                            initialScreening = initialScreening + 1
                        }
                        if (response.data[0][i].status == 4) {
                            interviewing = interviewing + 1
                        }
                        if (response.data[0][i].status == 5) {
                            hired = hired + 1
                        }
                        else if (response.data[0][i].status == 6) {
                            rejected = rejected + 1
                        }

                        total = total + 1
                    }
                    var labels = ["Accepted", "Rejected", "Submitted", "Reviewed", "InitialScreening", "Interviewing"]
                    var values = [hired, rejected, submitted, reviewed, initialScreening, interviewing]
                    var data = [{
                        label: "Accepted",
                        value: hired
                    },
                    {
                        label: "Rejected",
                        value: rejected
                    },
                    {
                        label: "Submitted",
                        value: submitted
                    },
                    {
                        label: "Reviewed",
                        value: reviewed
                    },
                    {
                        label: "InitialScreening ",
                        value: initialScreening
                    },
                    {
                        label: "Interviewing ",
                        value: interviewing
                    },
                    ]
                    setReportData(values)
                    setLabels(labels)
                    console.log(response.data);
                }
            });




        setOpen(true)


    };


    return (
        <div>
            <Grid container spacing={3} style={{ width: "1200px" }}>
                <Grid item lg={4} md={4} xs={12}>
                    {data.map((job) => {
                        return (
                            <div
                                className="job-card-wrapper"
                                onClick={() => handleOpen(job)}
                            >
                                <div className="job-title">
                                    <div>
                                        <span>
                                            {job.jobTitle}
                                        </span>
                                    </div>
                                </div>
                                <div className="job-card-company-details">
                                    <span>
                                        {" "}
                                        <b> {new Date(job.datePosted).toDateString()}</b>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </Grid>
                <Grid item lg={8} md={8} xs={12}>
                    <div>
                        <div className="recipient-description-card-wrapper">
                            {open &&
                                data.length != 0 &&
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", margin: "0px 25%" }}>
                                        <Chart
                                            labels={labels}
                                            data={reportData}
                                            type="Doughnut"
                                            style={{ width: "500px", height: "500px" }}
                                            // color={["blue", "red", "orange", "yellow", "green"]}
                                            labelValue="Job Applications Status"
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default JobsReportCard;
