import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDescriptionCard from "./JobDescriptionCard";
import _ from "lodash";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";

const JobSearchResults = (props) => {
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const [cardDetails, setCardDetails] = useState();
  const [selecetdJobCard, setSelectedJobCard] = useState();

  const onCardClick = async (cardId) => {
    console.log("card click", cardId);

    const cardDesc = _.find(props.searchResults, { _id: cardId });
    setSelectedJobCard(cardId);
    setCardDetails(cardDesc);
  };

  const setFirst = async () => {
    console.log("here");
    if (props.searchResults.length > 0 && !cardDetails) {
      setCardDetails(props.searchResults[0]);
      setSelectedJobCard(props.searchResults[0]._id);
    }
  };

  // useEffect(() => {
  //   setFirst();
  // });

  const handlePageChange = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [props.searchResults]);

  useEffect(() => {
    const data = paginate(props.searchResults, currentPage, pageSize);
    setTotalCount(props.searchResults.length);
    setData(data);
    if (data.length > 0) {
      setCardDetails(data[0]);
      setSelectedJobCard(data[0]._id);
    }
  }, [currentPage, props.searchResults]);

  let card = null;
  if (cardDetails) card = <JobDescriptionCard cardDetails={cardDetails} />;
  // else
  //     setCardDetails(props.searchResults)

  console.log("SearchResults: ", props.searchResults);
  return (
    <div className="container job-search-wrapper">
      <div className="cards-wrapper">
        {data?.map((card) => {
          return (
            <JobCard
              card={card}
              onClick={onCardClick}
              selecetdJobCard={selecetdJobCard}
            />
          );
        })}
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
      {props.searchResults.length > 0 && card}
    </div>
  );
};

export default JobSearchResults;
