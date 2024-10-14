import { JobOffer } from "../api/apiModel";
import { getExperience, getPartTime, getRemote } from "../utils/enumUtils";
import { useNavigate } from "react-router-dom";
import "./jobOfferCard.css";
import { useAppliedOffers } from "../context/AppliedOffersContext";

interface JobOfferProps {
  offer: JobOffer;
}

export default function JobOfferCard({ offer }: JobOfferProps) {
  const navigate = useNavigate();
  const { appliedOfferIds } = useAppliedOffers();

  const handleCardClick = () => {
    navigate(`/job-offer/${offer.id_JobOffer}`, {
      state: { offer },
    });
  };

  return (
    <div className="card job-offer-card" onClick={handleCardClick}>
      <div className="row valign-wrapper" style={{ padding: "0.5rem 2rem" }}>
        <div className="col s7">
          <h5 className="card-title">
            {offer.name}{" "}
            {appliedOfferIds.has(offer.id_JobOffer) && (
              <span
                style={{
                  backgroundColor: "#b2d8d8",
                  fontSize: "1rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  color: "#004c4c ",
                  marginLeft: "1rem",
                }}
              >
                Applied
              </span>
            )}
          </h5>
          <h6 className="card-subtitle">{offer.companyName}</h6>
        </div>

        <div
          className="col s3 indigo lighten-5 right"
          style={{
            padding: "1rem 1.5rem",
            borderRadius: "4px",
          }}
        >
          <p style={{ fontSize: "1.1rem", margin: "0" }}>
            From <strong>{offer.salary} €</strong>/month
          </p>
        </div>

        <div className="col s3 right" style={{ padding: "0 0 0 2rem" }}>
          <div className="row valign-wrapper" style={{ margin: "0.3rem 0" }}>
            <i className="tiny material-icons">place</i>
            <strong>&nbsp;&nbsp;Location:&nbsp;</strong>
            {offer.location}
          </div>
          <div className="row valign-wrapper" style={{ margin: "0.3rem 0" }}>
            <i className="tiny material-icons">show_chart</i>
            <strong>&nbsp;&nbsp;Experience:&nbsp;</strong>
            {getExperience(offer.experienceLevel)}
          </div>
          <div className="row valign-wrapper" style={{ margin: "0.3rem 0" }}>
            <i className="tiny material-icons">apartment</i>
            <strong>&nbsp;&nbsp;Remote:&nbsp;</strong>
            {getRemote(offer.workEnvironment)}
          </div>
          <div className="row valign-wrapper" style={{ margin: "0.3rem 0" }}>
            <i className="tiny material-icons">schedule</i>
            <strong>&nbsp;&nbsp;Part Time:&nbsp;</strong>
            {getPartTime(offer.partTime)}
          </div>
        </div>

        <i className="material-icons arrow-icon">chevron_right</i>
      </div>
    </div>
  );
}
