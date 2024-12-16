import { JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import Filters from "../HomePage/Filters";
import { useState } from "react";
import Pagination from "../HomePage/Pagination";
import "./jobOffersPage.css";

export default function JobOffersPage() {
  const { data } = useFetch<JobOffer[]>("JobOffer");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  return (
    <>
      <div>
        <h1 className="jobOffersPage__title">Job Offers</h1>
        <Filters
          onFilterChange={(filteredData) => setJobOffers(filteredData)}
        />
        <div className="jobOffersPage__box">
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
