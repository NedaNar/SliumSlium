import { JobOffer } from "../../api/apiModel";
import { format } from "date-fns";
import "./jobOfferCard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import JobInformation from "./JobInformation";

interface JobOfferProps {
  offer: JobOffer;
  handleCardClick: () => void;
}

export default function JobOfferCard({
  offer,
  handleCardClick,
}: JobOfferProps) {
  const { user, userJobOffers } = useContext(UserContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 900);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="card job-offer-card" onClick={handleCardClick}>
      <div
        className={`row ${
          isSmallScreen ? "" : "valign-wrapper"
        } jobOfferCard__box`}
      >
        <div className={`${isSmallScreen ? "row" : "col s6"}`}>
          <p className="card-title valign-wrapper jobOfferCard__title">
            {offer.name}
            {user?.type === 1 &&
              userJobOffers &&
              userJobOffers.some(
                (off) => off.fk_JobOfferid_JobOffer === offer.id_JobOffer
              ) && (
                <>
                  {!isSmallScreen && (
                    <span className="jobOfferCard__appl">Applied</span>
                  )}
                  {isSmallScreen && (
                    <i
                      className="material-icons teal-text"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      check_circle
                    </i>
                  )}
                </>
              )}
          </p>
          <p className="card-subtitle">
            {user?.type === 0
              ? `Valid until ${format(new Date(offer.validDate), "yyyy-MM-dd")}`
              : offer.companyName}
          </p>
        </div>

        {(user?.type === 1 || !isSmallScreen) && (
          <div
            className={`${user?.type === 1 ? "indigo lighten-5" : ""} ${
              isSmallScreen ? "row" : "col s3 right"
            } jobOfferCard__salary`}
          >
            {user?.type === 1 && (
              <p className="jobOfferCard__salaryText">
                From <strong>{offer.salary} €</strong>/month
              </p>
            )}{" "}
          </div>
        )}

        <div className={`${isSmallScreen ? "row" : "col s3 right"}`}>
          <JobInformation offer={offer} />
        </div>

        <i className="material-icons arrow-icon">chevron_right</i>
      </div>
    </div>
  );
}
