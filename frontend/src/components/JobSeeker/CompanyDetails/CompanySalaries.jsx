import React, { useEffect } from "react";
import Select from "../../common/Select";
import SalaryCard from "./SalaryCard";
import Modal from "react-modal";
import CompanySalaryForm from "./CompanySalaryForm";
import "../../../styles/companyStyles.css";

const CompanySalaries = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    // fetch salary data;
    console.log("fetch salary data");
  }, []);

  return (
    <div className="p-3">
      <div className="d-flex flex-row justify-content-between pb-2">
        <h3>
          <b>
            {props.companyName} salaries: How much does {props.companyName} pay?
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
            options={[1, 2, 2, 4]}
            className="medium rounded-corners"
            labelclass="label"
            required
          />
          <Select
            label="Location"
            id="location"
            name="location"
            options={[1, 2, 2, 4]}
            className="medium rounded-corners"
            labelclass="label"
            required
          />
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        <SalaryCard salaryDetails={{}}></SalaryCard>
        <SalaryCard salaryDetails={{}}></SalaryCard>
        <SalaryCard salaryDetails={{}}></SalaryCard>
        <SalaryCard salaryDetails={{}}></SalaryCard>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <CompanySalaryForm />
      </Modal>
    </div>
  );
};

export default CompanySalaries;
