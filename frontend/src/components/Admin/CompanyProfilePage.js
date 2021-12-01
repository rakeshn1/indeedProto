import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getListOfAllReviewsExceptUnApproved } from '../../services/admin'
import { getCompanyNames } from '../../services/searchService'
import Button from '../common/Button'
import SearchBox from '../common/SearchBox'
import SearchDataStats from './SearchDataStats'

const CompanyProfilePage = () => {

    const [companiesList, setCompaniesList] = useState([])
    const [showResults, setShowResults] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState()
    // const [, setCompaniesList]=useState()

    const [searchText, setSearchText] = useState()
    // const fetchCompaniesList = async () => {
    //     const response = await getCompaniesNames()
    //     setCompaniesList(response.data)
    // }

    const onSearchTextChangeHandler = async (e) => {
        console.log("search text:", e)
        setSearchText(searchText);
        const companyListIn = await getCompanyNames(e)
        console.log("List", companyListIn)
        setCompaniesList(companyListIn.data)
    }

    const setCompanyHandler = async (e) => {
        const payload = {

            status: 1
        }
        setSelectedCompany({})
    }

    const onButtonClickHandler = async () => {
        const payload = {
            companyId: selectedCompany
        }
        const response = await getListOfAllReviewsExceptUnApproved(payload)
        console.log("list of reviews", response.data)
        showResults(true)
        // setReviewsList(response.data);

    }
    return (

        <div className="container" >

            <div style={{ display: "flex", width: "100%", padding: "20px", margin: "0px auto" }} >
                <SearchBox
                    onChange={onSearchTextChangeHandler}
                    placeholder="Company Name"
                    innerLabel="Search for companies"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>}
                    style={{
                        height: "40px",
                        width: "40%",
                        // margin: "15px"
                    }}
                    value={searchText}
                    list="companiesList"
                />
                <datalist id="companiesList">
                    {companiesList.map((data) => (
                        <option
                            key={data}
                            value={data}
                            onClick={(e) =>
                                this.onSearchTextChangeHandler(e)
                            }
                        >
                            {data}
                        </option>
                    ))}
                </datalist>
                <Button
                    text="Get Company Data"
                    onClick={onButtonClickHandler}
                    style={{ width: "150px" }}
                />
                {/* <ul>
                    {
                        companiesList.map(i => {
                            return (
                                <>
                                    <li onClick={() => setCompanyHandler(i)}>{i}</li>
                                </>
                            )
                        })

                    }
                </ul> */}
            </div>

            <div>

                {showResults === true ? <SearchDataStats company={selectedCompany} /> : ""}

            </div>

        </div >
    )
}

export default CompanyProfilePage
