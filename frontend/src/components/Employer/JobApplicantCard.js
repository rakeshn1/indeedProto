import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField, ListItemText, Grid, MenuItem } from "@material-ui/core";
import Button from "../common/Button";
import { getCurrentUser, getJwt } from "../../services/auth";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
const JobApplicantCard = () => {
    const history = useHistory()
    var [jobs, setJobs] = useState([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(-1);
    const [applicants, setApplicants] = useState([]);
    const [applicationsStatus, setApplicationsStatus] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const user = getCurrentUser();
    const jobType = ["Full Time", "Part Time", "Remote"]
    const status = {
        1: "Submitted",
        2: "Reviewed",
        3: "InitialScreening",
        4: "Interviewing",
        5: "Hired",
        6: "Rejected",
    };
    const [applicationStatus, setApplicationStatus] = useState([]);

    useEffect(() => {
        var x = [];
        for (const [key, value] of Object.entries(status)) {
            x.push({ label: key, value: value });
        }
        setApplicationStatus(x);
        console.log(applicationStatus);
        axios
            .get(
                `http://localhost:3900/employer/api/getCompanyJobs/${user.companyId}`,
            )
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    alert({ html: response.statusText, classes: "#c62828 red darken-3" });
                } else {
                    setTotalJobs(response.data.length)
                    const slice = response.data.slice(offset, offset + perPage);
                    console.log(response.data);
                    const postData = slice.map((job, index) => {
                        return (

                            <div className="review-card-wrapper">
                                <div className="job-title">

                                    <div>
                                        <button onClick={() => handleOpen(job)}>
                                            {job.jobTitle}
                                        </button>
                                    </div>


                                </div>

                                <div className="job-card-company-details">

                                    <span>{job.industry}
                                    </span>
                                </div>
                                <div>
                                    <p>
                                        <span>
                                            {jobType[job.jobType]}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 20">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                            </svg>
                                            {job.location.city + " " + job.location.state + " " + job.location.country + " " + job.location.zipcode}</span>

                                    </p>
                                </div>
                                <div className="job-card-salary">
                                    <span>{new Date(job.datePosted).toDateString()}</span>

                                </div>
                                <div className="job-card-salary">
                                    <span>{job.salary}</span>

                                </div>
                                <div className="job-card-role-summary">
                                    <ul>

                                        <li>
                                            {job.responsibilities}
                                        </li>


                                    </ul>


                                </div>


                            </div>
                        )
                    })
                    setJobs(postData)
                }
            })
    }, [currentPage, perPage])

    const handleChange = (e, applicant) => {
        console.log(e.target.value);
        console.log(applicant._id);
        axios
            .put(
                `http://localhost:3900/employer/api/updateApplicationStatus/${applicant._id}`,
                {
                    status: e.target.value,
                }
            )
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    alert({ html: response.statusText, classes: "#c62828 red darken-3" });
                } else {
                    setOpen(false);
                }
            });
    };

    function getModalStyle() {
        return {
            justifyContent: "center",
            padding: 50,
        };
    }

    const handleSendMessage = (applicant) => {

        console.log(applicant);
        axios
            .post(
                "http://localhost:3900/employer/api/createConversation",
                {
                    companyId: user.companyId,
                    userId: applicant._id,
                }
            )
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    alert({ html: response.statusText, classes: "#c62828 red darken-3" });
                } else {
                    history.push('/chat')
                }
            });

    };


    const handleOpen = (job) => {
        const jobId = job._id;
        console.log(jobId);
        axios
            .get(`http://localhost:3900/employer/api/getApplicationDetails/${jobId}`)
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    console.log("yyyy")
                    // M.toast({ html: response.data.statusText, classes: "#c62828 red darken-3" })
                } else {
                    console.log("hhhhh", response.data[0]);
                    setApplicationsStatus(response.data[0]);
                    //setApplicantStatus(vals)
                    setApplicants(response.data[1]);
                    setOpen(true);
                }
            });
    };

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: "relative",
            width: 900,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            outline: "none",
            top: "-25%",
            right: "auto",
            bottom: "auto",
            overlfow: "scroll", // <-- This tells the modal to scrol
            maxHeight: "calc(100vh)",
            overflowY: "auto",
        },
    }));
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setTotal(0);
        setApplicationsStatus(null);
    };

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
        setOffset(e.selected * perPage);
    };

    return (
        applicationStatus && (
            <div style={{ justifyContent: "center" }}>
                <div className="reviews-wrapper">
                    {jobs}
                </div>
                <div style={{ justifyContent: "center" }}>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalJobs / perPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </div>
                <div style={{ padding: 50 }}>
                    {applicants ? (
                        <Modal
                            backdropOpacity={0.3}
                            style={{
                                marginTop: "20%",
                                backgroundColor: "rgba(255,255,255,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            open={open}
                            onClose={handleClose}
                            scrollable={true}
                        >
                            <div style={modalStyle} className={classes.paper}>
                                <h4 style={{ textAlign: "center" }}>Applicants</h4>
                                <hr />
                                <Grid container spacing={3}>
                                    <Grid item lg={3} md={3} xs={12}>
                                        {" "}
                                        <h3>Name</h3>
                                    </Grid>
                                    <Grid item lg={3} md={3} xs={12}>
                                        {" "}
                                        <h5>Resume And Cover Letter</h5>
                                    </Grid>
                                    <Grid item lg={3} md={3} xs={12}>
                                        {" "}
                                        <h5>Status</h5>
                                    </Grid>
                                    <Grid item lg={3} md={3} xs={12}>
                                        {" "}
                                        <h5>Start a Conversation</h5>
                                    </Grid>
                                </Grid>
                                {applicationsStatus && applicationsStatus.length != 0 && applicants.map((applicant, index) => {
                                    return (
                                        <div
                                            style={{ padding: "20px", backgroundColor: "#f6f6f6" }}
                                        >
                                            <Grid container spacing={3}>
                                                <Grid item lg={3} md={3} xs={12}>
                                                    {" "}
                                                    <span

                                                        className="link"
                                                        style={{ color: "black" }}
                                                    >
                                                        {applicant.firstName + " " + applicant.lastName}
                                                    </span>
                                                </Grid>
                                                <Grid item lg={3} md={3} xs={12}>
                                                    {" "}
                                                    {applicant.coverLetter &&
                                                        <a
                                                            href={applicant.coverLetter}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            download="indeed_coverLetter.pdf"
                                                        >
                                                            <Button
                                                                text="Cover Letter"
                                                                style={{
                                                                    fontSize: "14px",
                                                                    borderRadius: "5px",
                                                                    backgroundColor: "white",
                                                                    color: "#085ff7",
                                                                }}
                                                            ></Button>
                                                        </a>}
                                                    <a
                                                        href={applicant.resume}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        download="indeed_coverLetter.pdf"
                                                    >
                                                        <Button
                                                            text="Resume"
                                                            style={{
                                                                fontSize: "14px",
                                                                borderRadius: "5px",
                                                                backgroundColor: "white",
                                                                color: "#085ff7",
                                                            }}
                                                        ></Button>
                                                    </a>
                                                </Grid>

                                                <Grid item lg={3} md={3} xs={12}>
                                                    {" "}
                                                    <div
                                                        className="p-3 rounded-corners"
                                                        style={{ background: "#f3f2f1" }}
                                                    >
                                                        <div className="d-flex flex-row justify-content-between flex-wrap">
                                                            <TextField
                                                                fullWidth
                                                                name="Status"
                                                                size="small"
                                                                onChange={(e) => {
                                                                    handleChange(e, applicationsStatus[index]);
                                                                }}
                                                                required
                                                                select
                                                                SelectProps={{ native: true }}
                                                                value={applicationsStatus[index].status}
                                                                variant="outlined"
                                                                margin="normal"
                                                            >
                                                                {applicationStatus.map((option) => (
                                                                    <option
                                                                        key={option.label}
                                                                        value={option.label}
                                                                    >
                                                                        {option.value}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={3} md={3} xs={12}>
                                                    {" "}
                                                    <Button text="Message" onClick={() => handleSendMessage(applicant)}></Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    );
                                })}
                            </div>
                        </Modal>
                    ) : null}
                </div>

            </div>
        )
    );
};

export default JobApplicantCard;
