import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getListOfAllReviewsExceptUnApproved,
  getJobStats,
  getAllCompanies,
} from "../../services/admin";
import { getCompaniesByName } from "../../services/searchService";
import Button from "../common/Button";
import SearchBox from "../common/SearchBox";
import SearchDataStats from "./SearchDataStats";
import _ from "lodash";

const CompanyProfilePage = () => {
  const [companiesList, setCompaniesList] = useState([]);
  const [allCompaniesList, setAllCompaniesList] = useState([])
  const [reviewsList, setReviewsList] = useState();
  const [jobStats, setJobStats] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();

  const [searchText, setSearchText] = useState();

  const onSearchTextChangeHandler = async (e) => {
    console.log("search text:", e);
    setSearchText(searchText);
    const id = _.find(companiesList, { name: e });
    if (id) {
      setSelectedCompanyId(id._id);
    }
    console.log("IDDDD: ", id);
    const companyListIn = await getCompaniesByName(e);
    console.log("List", companyListIn);
    setCompaniesList(companyListIn.data);
  };

  const onButtonClickHandler = async () => {
    const payload = {
      companyId: selectedCompanyId,
    };
    console.log("Payload: ", payload);
    const response = await getListOfAllReviewsExceptUnApproved(payload);
    console.log("list of reviews", response.data);
    setReviewsList(response.data);

    const result = await getJobStats(payload);
    console.log("jobStats:", result);
    setJobStats(result.data);
  };

  useEffect(() => {
    fetchCompanies();

  }, [])

  const fetchCompanies = async () => {
    const response = await getAllCompanies();
    console.log("list", response.data)
    setAllCompaniesList(response.data)
  }




  return (
    <div className="container"  >
      <div style={{ display: "flex" }} >
        <div style={{ maxWidth: "200px", width: "200px", marginRight: "20px" }}>
          <h5>All Companies</h5>
          <ul class="list-group">

            {
              allCompaniesList.map(company => {

                return (<li class="list-group-item">{company}</li>)
              })
            }
          </ul>

        </div>

        <div style={{ paddingLeft: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "20px",
              margin: "0px auto",
            }}
          >
            <SearchBox
              onChange={onSearchTextChangeHandler}
              placeholder="Company Name"
              innerLabel="Search company"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              }
              style={{
                height: "40px",
                width: "50%",
              }}
              value={searchText}
              list="companiesList"
            />
            <datalist id="companiesList">
              {companiesList.map((data) => (
                <option key={data._id} value={data.name}>
                  {data.name}
                </option>
              ))}
            </datalist>
            <Button
              text="Get Company Data"
              onClick={onButtonClickHandler}
              style={{ width: "150px" }}
            />
          </div>

          <div style={{ paddingLeft: "20px" }}>
            {reviewsList && (
              <SearchDataStats reviewsList={reviewsList} jobStats={jobStats} />
            )}
          </div>
        </div>
      </div>

    </div >
  );
};

export default CompanyProfilePage;
