import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import {
    TextField,
    ListItemText,
    Grid,
    MenuItem
} from '@material-ui/core';
import Button from '../common/Button'

import { Link } from "react-router-dom";
const JobApplicantCard = () => {
    var [jobs, setJobs] = useState([])
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(-1);
    const [applicants, setApplicants] = useState([])
    const [applicationsStatus, setApplicationsStatus] = useState([])
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const status = { "1": "Submitted", "2": "Reviewed", "3": "InitialScreening", "4": "Interviewing", "5": "Hired", "6": "Rejected" }
    const [applicationStatus, setApplicationStatus] = useState([])

    useEffect(() => {
        var x = []
        for (const [key, value] of Object.entries(status)) {
            x.push({ "label": key, "value": value })
        }
        setApplicationStatus(x)
        console.log(applicationStatus)
        axios.get("http://localhost:3900/employer/api/getCompanyJobs/619d46a4c6f3fa96b4f6cb5e", {
        }).then(response => {
            console.log(response)
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                const slice = response.data.slice(offset, offset + perPage)
                console.log(response.data)
                const postData = slice.map((job, index) => {
                    return (
                        <div className="review-card-wrapper">
                            <div className="job-title">
                                <div><button onClick={() => handleOpen(job)}>{job.jobTitle}</button></div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="job-card-company-details">
                                <span> <b> 4.3 </b> <svg width='18' height='18' fill='currentColor' viewBox="5 0 18 22"
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M8.805 4.134a.206.206 0 01.385 0l1.312 3.203 3.307.317c.184.018.258.257.12.385l-2.498 2.298.732 3.394c.04.188-.154.336-.312.238l-2.854-1.777-2.853 1.776c-.158.099-.352-.05-.311-.238l.736-3.393-2.497-2.298c-.139-.128-.065-.367.119-.385l3.307-.317 1.307-3.203z' />
                                </svg>
                                </span>
                            </div>
                            <div>
                                <p>
                                    <span>
                                        Cupertino, CA 95104
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 20">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                        Remote</span>
                                </p>
                            </div>
                            <div className="job-card-salary">
                                <span>Number of applicants : {job.totalApplicants}</span>
                            </div>
                            <div className="job-card-role-summary">
                                <ul>
                                    <li>
                                        Refine ideas and come up with new ones to design a
                                        highly polished visual experience.
                                    </li>
                                    <li>
                                        Collaborate with other designers to help build a
                                        strong design team and culture.
                                    </li>
                                </ul>
                                {/*  */}
                            </div>
                            <div className="job-card-posted-ago">
                                7 days ago
                            </div>
                        </div>
                    )
                })
                setJobs(postData)
            }
        })
    }, [currentPage, perPage])

    const handleChange = (e, applicant) => {
        console.log(e.target.value)
        console.log(applicant._id)
        axios.put(`http://localhost:3900/employer/api/updateApplicationStatus/${applicant._id}`, {
            status: e.target.value
        }).then(response => {
            console.log(response)
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                setOpen(false)
            }
        })
    }

    function getModalStyle() {
        return {
            justifyContent: 'center',
            padding: 50
        };
    }

    const handleOpen = (job) => {
        const jobId = job._id
        console.log(jobId)
        axios.get(`http://localhost:3900/employer/api/getApplicationDetails/${jobId}`).then(response => {
            console.log(response)
            if (response.status != 200) {
                M.toast({ html: response.data.statusText, classes: "#c62828 red darken-3" })
            }
            else {

                // let vals = {}
                // let users = {}
                // for (var i = 0; i < response.data[0].length; i++) {
                //     if (response.data[0][i]._id in vals)
                //         vals[response.data[0][i]._id] = response.data[0][i].status
                //     users[response.data[0][i].userId] = response.data[0][i]._id
                // }
                console.log("yeye", response.data)
                setApplicationsStatus(response.data[0])
                //setApplicantStatus(vals)
                setApplicants(response.data[1]);

                setOpen(true)
            }
        })
    };

    const useStyles = makeStyles(theme => ({
        paper: {
            position: "relative",
            width: 900,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            outline: "none",
            top: '-25%',
            right: 'auto',
            bottom: 'auto',
            overlfow: 'scroll', // <-- This tells the modal to scrol
            maxHeight: 'calc(100vh)',
            overflowY: 'auto'
        }
    }));
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setTotal(0)
    };




    const handlePageClick = (e) => {
        setCurrentPage(e.selected)
        setOffset(e.selected * perPage)
    }

    return (applicationStatus && applicationsStatus &&
        < div style={{ justifyContent: 'center', padding: 40 }
        }>
            <div className="reviews-wrapper">
                {jobs}
                <div style={{ justifyContent: 'center' }}>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount='10'
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />

                </div>
                <div style={{ padding: 50 }}>
                    {applicants ?
                        <Modal
                            backdropOpacity={0.3}
                            style={{ marginTop: '20%', backgroundColor: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            open={open}
                            onClose={handleClose}
                            scrollable={true}
                        >
                            <div style={modalStyle} className={classes.paper}>
                                <h4 style={{ textAlign: 'center' }}>Applicants</h4>
                                <hr />
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        xs={12}
                                    > <h3>Name</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        xs={12}
                                    > <h5>Resume And Cover Letter</h5></Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        xs={12}
                                    > <h5>Status</h5></Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        xs={12}
                                    > <h5>Start a Conversation</h5></Grid>

                                </Grid>
                                {
                                    applicants.map((applicant, index) => {
                                        return (
                                            <div style={{ padding: '20px', backgroundColor: '#f6f6f6' }}>

                                                <Grid
                                                    container
                                                    spacing={3}
                                                >
                                                    <Grid
                                                        item
                                                        lg={3}
                                                        md={3}
                                                        xs={12}
                                                    >   <Link
                                                        to="/"
                                                        className="link"
                                                        style={{ color: "black" }}
                                                    >
                                                            {applicant.firstName + " " + applicant.lastName}
                                                        </Link>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        lg={3}
                                                        md={3}
                                                        xs={12}
                                                    > <h5>Resume And Cover Letter</h5></Grid>

                                                    <Grid
                                                        item
                                                        lg={3}
                                                        md={3}
                                                        xs={12}
                                                    >  <div className="p-3 rounded-corners" style={{ background: "#f3f2f1" }}>
                                                            <div className="d-flex flex-row justify-content-between flex-wrap">
                                                                <TextField
                                                                    fullWidth
                                                                    name="Status"
                                                                    size="small"
                                                                    onChange={(e) => {
                                                                        handleChange(e, applicationsStatus[index])
                                                                    }
                                                                    }
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
                                                    <Grid
                                                        item
                                                        lg={3}
                                                        md={3}
                                                        xs={12}
                                                    > <Button text="Message"></Button></Grid>
                                                </Grid>
                                            </div>
                                        )
                                    })

                                }

                            </div>
                        </Modal>
                        : null
                    }
                </div>

            </div>
        </div >)
}


export default JobApplicantCard
