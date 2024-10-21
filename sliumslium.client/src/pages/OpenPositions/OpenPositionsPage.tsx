import { useNavigate } from "react-router";
import { JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import JobOfferCard from "../../components/JobOfferCard";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function OpenPositionsPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { data } = useFetch<JobOffer[]>(`JobOffer/user/${user?.id_User}`);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Created Positions</h1>
        <h6 style={{ textAlign: "center", marginBottom: "3rem" }}>
          {user?.name}
        </h6>
        <button className="btn-large indigo" style={{ margin: "0 0 1rem" }}>
          <div className="valign-wrapper">
            <span>Create position &nbsp;</span>
            <i className="large material-icons">add</i>
          </div>
        </button>
        {data &&
          data.map((offer, index) => (
            <JobOfferCard
              key={index}
              offer={offer}
              handleCardClick={() => {
                navigate(`/job-position/${offer.id_JobOffer}`, {
                  state: { offer },
                });
              }}
            />
          ))}
      </div>
    </>
  );
}
