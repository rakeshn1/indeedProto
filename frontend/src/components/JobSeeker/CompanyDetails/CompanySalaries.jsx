import React, { useEffect } from "react";
import Select from "../../common/Select";
import SalaryCard from "./SalaryCard";
import Modal from "react-modal";
import CompanySalaryForm from "./CompanySalaryForm";
import { getSalaryReviews, getSalaryJobLocations, getSalaryJobTitles } from "../../../services/jobSeeker";

import "../../../styles/companyStyles.css";

const CompanySalaries = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [titleOptions, setTitleOptions] = React.useState([])
  const [selectedJobTitle, setSelectedJobTitle] = React.useState(null)
  const [locationOptions, setLocationOptions] = React.useState([])
  const [selectedJobLocation, setSelectedJobLocation] = React.useState(null)
  const [salaries, updateSalaries] = React.useState([])

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    // fetch salary data;
    if(modalIsOpen === false){
      getSalaryReviews(props.companyDetails._id, selectedJobTitle, selectedJobLocation)
        .then((res) => {updateSalaries(res.data)})
      getSalaryJobLocations(props.companyDetails._id, selectedJobTitle)
          .then((res) => {setLocationOptions(res.data)})
      getSalaryJobTitles(props.companyDetails._id, selectedJobLocation)
        .then((res) => {setTitleOptions(res.data)})
    }
  }, [props.companyDetails._id, selectedJobLocation, selectedJobTitle, modalIsOpen]);

  return (
    <div className="p-3">
      <div className="d-flex flex-row justify-content-between pb-2">
        <h3>
          <b>
            {props.companyDetails.name} salaries: How much does {props.companyDetails.name} pay?
          </b>
        </h3>
        <button className="button-secondary" onClick={openModal}>
          {/* Modal popup button here to add salary data */}
          Add salary
        </button>
      </div>
      <div
        className="p-3 rounded-corners"
        style={{ background: "#f3f2f1", marginBottom: "1rem" }}
      >
        <div className="d-flex flex-row justify-content-between flex-wrap">
          <Select
            label="Job Title"
            id="jobTitle"
            name="jobTitle"
            placeholder="All"
            options={titleOptions}
            className="medium rounded-corners"
            labelclass="label"
            onChange={(e) =>
              setSelectedJobTitle(e.target.value)
            }
            required
          />
          <Select
            label="Location"
            id="location"
            name="location"
            placeholder="All"
            options={locationOptions}
            className="medium rounded-corners"
            labelclass="label"
            onChange={(e) =>
              setSelectedJobLocation(e.target.value)
            }
            required
          />
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        {salaries.map(salary => <SalaryCard key={salary._id} salaryDetails={salary}></SalaryCard>)}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <CompanySalaryForm companyDetails={props.companyDetails} closeModal={closeModal}/>
      </Modal>
    </div>
  );
};

export default CompanySalaries;
