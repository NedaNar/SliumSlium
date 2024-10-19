import { JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import Filters from "./Filters";
import { useState } from "react";
import Pagination from "./Pagination";

export default function HomePage() {
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
            <Pagination jobOffers={jobOffers} />
          ) : (
            data && <Pagination jobOffers={data} />
          )}
        </div>
      </div>
    </>
  );
}
