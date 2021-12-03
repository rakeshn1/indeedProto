import React from "react";

const CompanySalaryCard = (props) => {
  const {
    salaryDetails: { benefits, jobTitle, salary },
  } = props;

  return (
    <div
      className="p-3 rounded-corners bordered"
      style={{
        marginTop: "1rem",
        marginRight: "1rem",
        minWidth: '400px',
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
          <div>{jobTitle}</div>
          <div style={{marginLeft: 40}}>
            <div>Average Salary</div>
            <div style={{ fontWeight: "bold" }}>${salary}</div>
            <div style={{ textAlign: "right" }}>per year</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {benefits.length !== 0 && (
            <>
              <div style={{ fontWeight: "bold" }}>Perks</div>
              <ul style={{ columns: 2 }}>
                {benefits && benefits.map((perk) => <li key={perk}>{perk}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySalaryCard;
