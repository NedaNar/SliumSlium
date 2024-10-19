import { JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import Filters from "./Filters";
import JobOfferCard from "../../components/JobOfferCard";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const { data } = useFetch<JobOffer[]>("JobOffer");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
          Job Offers
        </h1>
        <Filters
          onFilterChange={(filteredData) => setJobOffers(filteredData)}
        />
        <div className="job-offers-list" style={{ marginTop: "2rem" }}>
          {jobOffers.length > 0 ? (
            jobOffers.map((offer) => (
              <JobOfferCard
                key={offer.id_JobOffer}
                offer={offer}
                handleCardClick={() => {
                  navigate(`/job-offer/${offer.id_JobOffer}`, {
                    state: { offer },
                  });
                }}
              />
            ))
          ) : (
            <>
              {data &&
                data.map((offer, index) => (
                  <JobOfferCard
                    key={index}
                    offer={offer}
                    handleCardClick={() => {
                      navigate(`/job-offer/${offer.id_JobOffer}`, {
                        state: { offer },
                      });
                    }}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
