import { useNavigate } from "react-router";
import { JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import JobOfferCard from "../../components/JobOffer/JobOfferCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import JobOfferModal from "../../components/Modals/JobOfferModal";
import "./openPositionsPage.css";

export default function OpenPositionsPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  const { data } = useFetch<JobOffer[]>(`JobOffer/user/${user?.id_User}`);

  useEffect(() => {
    if (data) {
      setJobOffers(data);
    }
  }, [data]);

  const handleNewOffer = (newOffer: JobOffer) => {
    setJobOffers((prevOffers) => [newOffer, ...prevOffers]);
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <h1 className="openPositions_header">Created Positions</h1>
        <h6 style={{ textAlign: "center", marginBottom: "3rem" }}>
          {user?.name}
        </h6>
        <button
          className="btn-large indigo"
          style={{ margin: "0 0 1rem" }}
          onClick={() => setModalOpen(true)}
        >
          <div className="valign-wrapper">
            <span>New position &nbsp;</span>
            <i className="large material-icons">add</i>
          </div>
        </button>
        {jobOffers &&
          jobOffers.map((offer, index) => (
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
      <JobOfferModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleNewOffer}
      />
    </>
  );
}
