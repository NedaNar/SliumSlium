import { useState } from "react";
import { JobOffer } from "../../api/apiModel";
import JobOfferCard from "../../components/JobOfferCard";
import { useNavigate } from "react-router";

interface PaginationProps {
  jobOffers: JobOffer[];
}

export default function Pagination({ jobOffers }: PaginationProps) {
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBook = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBook = indexOfLastBook - ITEMS_PER_PAGE;
  const currentJobs = jobOffers.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(jobOffers.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="job-offers-list" style={{ marginTop: "2rem" }}>
        {currentJobs.map((offer) => (
          <JobOfferCard
            key={offer.id_JobOffer}
            offer={offer}
            handleCardClick={() => {
              navigate(`/job-offer/${offer.id_JobOffer}`, {
                state: { offer },
              });
            }}
          />
        ))}
      </div>

      <div className="pagination-container center-align">
        <ul className="pagination">
          <li className={currentPage === 1 ? "disabled" : ""}>
            &emsp;
            <a
              href="#!"
              onClick={(e) => {
                if (currentPage === 1) {
                  e.preventDefault();
                } else {
                  handlePageChange(currentPage - 1);
                }
              }}
            >
              <i className="material-icons">keyboard_arrow_left</i>
            </a>{" "}
            &ensp;
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
            >
              <a
                href="#!"
                onClick={(e) => {
                  if (currentPage === index + 1) {
                    e.preventDefault();
                  } else {
                    handlePageChange(index + 1);
                  }
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li className={currentPage === totalPages ? "disabled" : ""}>
            &emsp;
            <a
              href="#!"
              onClick={(e) => {
                if (currentPage === totalPages) {
                  e.preventDefault();
                } else {
                  handlePageChange(currentPage + 1);
                }
              }}
            >
              <i className="material-icons">keyboard_arrow_right</i>
            </a>
            &ensp;
          </li>
        </ul>
      </div>
    </>
  );
}
