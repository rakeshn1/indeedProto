import React from "react";
import _ from "lodash";
const CompanySalaryCard = (props) => {
  // const {salaryDetails: {
  //  benifits,
  //  companyId,
  //  endDate,
  //  isJobSeekerCurrentCompany,
  //  jobSeekerId,
  //  jobLocation,
  //  jobTitle,
  //  salary,
  //  yearsOfRelevantExperience
  // }} = props
  //  ·

  return (
    <div
      className="p-3 rounded-corners bordered"
      style={{
        marginTop: "1rem",
        marginRight: "1rem",
        maxWidth: "600px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>Job Title</div>
          <div>
            <div>Average Salary</div>
            <div style={{ fontWeight: "bold" }}>$12000</div>
            <div style={{ textAlign: "right" }}>per year</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{fontWeight: 'bold'}}>Perks</div>
          <ul style={{ columns: 2 }}>
            {[
              "Paid time off",
              "Health insurance",
              "Life insurance",
              "Dental/ vision insurance",
              "Retirement/ 401(k)",
            ].map((perk) => (
              <li>{perk}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanySalaryCard;
