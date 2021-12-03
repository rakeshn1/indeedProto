import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@material-ui/core/styles';
import JobPostingsHeader from './JobPostingsHeader';
import { getCurrentUser, getJwt } from "../../services/auth";
const JobCard = () => {
    var [jobs, setJobs] = useState([])
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(-1);
    const user = getCurrentUser();
    const jobType = ["Full Time", "Part Time", "Remote"]
    useEffect(() => {
        axios.get(`http://localhost:3900/employer/api/getCompanyJobs/${user.companyId}`, {
        }).then(response => {
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                setTotal(response.data.length)
                const slice = response.data.slice(offset, offset + perPage)
                const postData = slice.map((job, index) => {
                    return (
                        <div className="review-card-wrapper">
                            <div className="job-title">
                                <div><span>{job.jobTitle}</span></div>


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
                                <span>${job.salary}</span>

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


    const handlePageClick = (e) => {
        setCurrentPage(e.selected)
        setOffset(e.selected * perPage)
    }
    const useStyles = makeStyles(theme => ({
        paper: {
            position: "relative",
            width: 600,
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
    return (
        <div style={{ justifyContent: 'center', padding: 40 }}>
            <JobPostingsHeader />

            <div className="reviews-wrapper">
                {jobs}
            </div>
            <div className="center">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={total / perPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        </div >)
}


export default JobCard
