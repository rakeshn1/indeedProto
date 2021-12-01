import React, { useEffect, useState } from "react";
import {
    getJobSeekerDetails,
    updateJobSeekerDetails,
} from "../../services/jobSeeker";
import Button from "../common/Button";
import Input from "../common/Input";
// import { ACCESS_SECRET_KEY_ID, ACCESS_KEY_ID } from '../../utils/constants';
import S3FileUpload from "react-s3";
import { getCurrentUser } from "../../services/auth";

<<<<<<< HEAD



=======
>>>>>>> 86af4f955487b49d5ccb2bffcd06f40055d16d4a
const config = {
    bucketName: "uber-eats-proto",
    dirName: "resumeUpload/" /* optional */,
    region: "us-east-2",
    accessKeyId: "AKIAUR4W3HRGHUKUAVWI",
    secretAccessKey: "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",
};
const JobSeekerProfile = () => {
    const user = getCurrentUser();
    const [data, setData] = useState();
    const [viewData, setViewData] = useState();
    const [showEditDiv, setShowEditDiv] = useState(false);
    const [resumeURL, setResumeURL] = useState();
    const [resCheck, setResCheck] = useState(false);

    const fetchJobSeekerDetails = async () => {
        const details = await getJobSeekerDetails({ userId: user._id });
        console.log("user details", details.data);
        setData({ ...details.data });
        setViewData({ ...details.data });
        setResumeURL(details.data.resume);
    };

    useEffect(() => {
        fetchJobSeekerDetails();
    }, []);

    const handleChange = (key, value) => {
        setData({ ...data, [key]: value });
    };
    const handleAddressChange = (key1, key2, value) => {
        let newData = { ...data };
        let add = { ...newData.address, [key1]: { [key2]: value } };
        setData({ ...data, ...add });
    };

    const makeEditable = () => {
        setShowEditDiv(!showEditDiv);
    };
    const updateDetails = async () => {
        setShowEditDiv(!showEditDiv);

        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            resume: resumeURL,
            address: {
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                zipcode: data.address.zipcode,
            },
        };

        const details = await updateJobSeekerDetails(user._id, payload);

        console.log("updated user details", details.data);
        setData(details.data);

        await fetchJobSeekerDetails();
    };

    const saveURL = async (e) => {
        await handleChange("resume", resumeURL);

        console.log("data", data);
        console.log("resume", resumeURL);
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            resume: resumeURL,
            address: {
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                zipcode: data.address.zipcode,
            },
            //  coverLetter = data.coverLetter,
            //  companyRole = data.companyRoledata
        };

        const details = await updateJobSeekerDetails(user._id, payload);

        console.log("updated user details", details.data);
        setData(details.data);
        setResCheck(false);

        await fetchJobSeekerDetails();
    };
    const uploadResume = async (e) => {
        console.log(e.target.files[0]);
        await S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) => {
                setResumeURL(data.location);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const deleteResume = async () => {
        await handleChange("resume", undefined);

        console.log("resume", data.resume);
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            resume: "",
            address: {
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                zipcode: data.address.zipcode,
            },
        };

        const details = await updateJobSeekerDetails(user._id, payload);

        console.log("updated user details", details.data);
        setData(details.data);
        // setResCheck(true)

        await fetchJobSeekerDetails();
    };
    let resumeHandlerFlex = null;

    if ((data && !data?.resume) || resCheck || !viewData) {
        resumeHandlerFlex = (
            <div className="resume-upload">
                <h5>
                    <b> Get Started</b>
                </h5>
                <div>
                    <input
                        style={{ width: "100%" }}
                        type="file"
                        onChange={uploadResume}
                    />
                </div>
                <Button
                    text="Save"
                    onClick={saveURL}
                    style={{
                        margin: "0px 5px",
                        backgroundColor: "#085ff7",
                        color: "white",
                        borderRadius: "20px",
                        border: "2px solid #085ff7",
                        width: "100%",
                    }}
                />
                <p>
                    {" "}
                    By continuing, you agree to create a public resume and agree to
                    receiving job opportunities from employers.
                </p>
            </div>
        );
    } else {
        resumeHandlerFlex = (
            <div className="resume-upload">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5>
                        <b>Resume</b>
                    </h5>
                    <div onClick={deleteResume}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="m15.536 7.8987c-0.1953-0.19526-0.5119-0.19526-0.7071 0l-2.8284 2.8284-2.8285-2.8284c-0.19526-0.19527-0.51185-0.19527-0.70711 0l-0.56568 0.56568c-0.19527 0.19526-0.19526 0.51185 0 0.70711l2.8285 2.8284-2.8285 2.8285c-0.19526 0.1952-0.19526 0.5118 0 0.7071l0.56568 0.5657c0.19527 0.1952 0.51185 0.1952 0.70711 0l2.8285-2.8285 2.8284 2.8284c0.1952 0.1953 0.5118 0.1953 0.7071 0l0.5657-0.5657c0.1952-0.1953 0.1952-0.5118 0-0.7071l-2.8284-2.8284 2.8283-2.8284c0.1953-0.19526 0.1953-0.51184 0-0.70711l-0.5656-0.56568z" />
                        </svg>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "40%",
                        }}
                    >
                        <div>
                            <svg width="44" height="64" viewBox="0 0 44 64">
                                <path
                                    d="M0 2C0 0.895431 0.895431 0 2 0H27C28.1046 0 29 0.895431 29 2V13C29 14.1046 29.8954 15 31 15H42C43.1046 15 44 15.8954 44 17V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V2Z"
                                    fill="#E4E2E0"
                                ></path>
                                <path
                                    d="M0 44H44V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V44Z"
                                    fill="#085ff7"
                                ></path>
                                <text fill="#FFFFFF" font-weight="700" font-size="12">
                                    {" "}
                                    <tspan x="10" y="58">
                                        PDF
                                    </tspan>
                                </text>
                            </svg>
                        </div>
                        <div>
                            {data &&
                                data?.resume.substring(data?.resume.lastIndexOf("/") + 1)}
                        </div>
                    </div>
                    <div style={{ width: "40%" }}>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <a
                                href={resumeURL}
                                target="_blank"
                                rel="noreferrer"
                                download="indeed_resume.pdf"
                            >
                                <Button
                                    text="Download"
                                    style={{
                                        fontSize: "14px",
                                        borderRadius: "5px",
                                        backgroundColor: "white",
                                        color: "#085ff7",
                                    }}
                                ></Button>
                            </a>

                            <Button
                                text="Replace"
                                style={{
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    color: "#085ff7",
                                    backgroundColor: "white",
                                }}
                                onClick={() => setResCheck(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="name-display">
                <div className="profile-circle">
                    {" "}
                    {viewData?.firstName.substring(0, 1)}
                    {viewData?.lastName.substring(0, 1)}{" "}
                </div>
                <div className="profile-name">
                    {" "}
                    {viewData ? viewData.firstName : "Your"}{" "}
                    {viewData ? viewData.lastName : "Name"}
                </div>
            </div>
            <div className="profile-wrapper">
                <div class="profile-flex-box">{resumeHandlerFlex}</div>
                {showEditDiv === false ? (
                    <div class="profile-flex-box">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5>
                                <b>Contact Information:</b>
                            </h5>
                            <div onClick={makeEditable}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            {viewData?.firstName} {viewData?.lastName}{" "}
                        </div>
                        <div>{viewData?.email}</div>
                        <div>{viewData?.phoneNumber}</div>
                    </div>
                ) : (
                    <div class="profile-flex-box">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5>
                                <b>Contact Information:</b>
                            </h5>
                        </div>
                        <Input
                            label="First Name"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleChange("firstName", e.target.value);
                            }}
                            type="text"
                            value={data?.firstName}
                        />
                        <Input
                            label="Last Name"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleChange("lastName", e.target.value);
                            }}
                            value={data?.lastName}
                            type="text"
                        />
                        <Input
                            label="Email"
                            disabled
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            value={viewData?.email}
                            type="text"
                        />
                        <Input
                            label="Phone Number"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleChange("phoneNumber", e.target.value);
                            }}
                            value={data?.phoneNumber}
                            type="text"
                        />
                        <h5>
                            <b>Location</b>
                        </h5>
                        <p>
                            Providing a specific location helps Indeed connect you with the
                            right job. Your street address is visible only to you.
                        </p>
                        <Input
                            label="City"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleAddressChange("address", "city", e.target.value);
                            }}
                            value={data?.address?.city}
                            type="text"
                        />{" "}
                        <Input
                            label="State"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleAddressChange("address", "state", e.target.value);
                            }}
                            value={data?.address?.state}
                            type="text"
                        />
                        <Input
                            label="Country"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleAddressChange("address", "country", e.target.value);
                            }}
                            value={data?.address?.country}
                            type="text"
                        />
                        <Input
                            label="Zip Code"
                            style={{
                                width: "100%",
                                border: "1px solid #696969",
                                marginBottom: "20px",
                                color: "black",
                            }}
                            onChange={(e) => {
                                handleAddressChange("address", "zipcode", e.target.value);
                            }}
                            value={data?.address?.zipcode}
                            type="text"
                        />
                        <div
                            style={{
                                display: "flex",
                                width: "30%",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                text="Save"
                                onClick={updateDetails}
                                style={{
                                    margin: "0px 5px",
                                    backgroundColor: "#085ff7",
                                    color: "white",
                                    borderRadius: "20px",
                                    border: "2px solid #085ff7",
                                    width: "100%",
                                }}
                            />
                            <Button
                                text="Cancel"
                                onClick={makeEditable}
                                style={{
                                    margin: "0px 5px",
                                    color: "#085ff7",
                                    backgroundColor: "white",
                                    borderRadius: "20px",
                                    border: "2px solid #085ff7",
                                    width: "100%",
                                }}
                            />
                        </div>
                    </div>
                )}

                <div class="profile-flex-box">
                    <h5>
                        <b>Job Preferences</b>
                    </h5>
                    <p>
                        Save specific details like desired pay and schedule that help us
                        match you with better jobs
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerProfile;
