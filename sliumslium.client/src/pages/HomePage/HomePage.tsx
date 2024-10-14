import { JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import Filters from "./Filters";
import JobOfferCard from "../../components/JobOfferCard";

export default function HomePage() {
  const { data } = useFetch<JobOffer[]>("JobOffer");

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
          Job Offers
        </h1>
        <Filters
          onFilterChange={function (filters: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        {data &&
          data.map((offer, index) => (
            <JobOfferCard key={index} offer={offer} />
          ))}
      </div>
    </>
  );
}
