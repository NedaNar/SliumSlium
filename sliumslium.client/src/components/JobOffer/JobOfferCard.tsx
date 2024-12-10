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
        className={`row ${isSmallScreen ? "" : "valign-wrapper"}`}
        style={{ padding: "0.5rem 2rem" }}
      >
        <div className={`${isSmallScreen ? "row" : "col s6"}`}>
          <h5
            className="card-title valign-wrapper"
            style={{ fontSize: isSmallScreen ? "1.4rem" : "1.6rem" }}
          >
            {offer.name}
            {user?.type === 1 &&
              userJobOffers &&
              userJobOffers.some(
                (off) => off.fk_JobOfferid_JobOffer === offer.id_JobOffer
              ) && (
                <>
                  {!isSmallScreen && (
                    <span
                      style={{
                        backgroundColor: "#b2d8d8",
                        fontSize: "1rem",
                        padding: "0.1rem 0.6rem",
                        borderRadius: "4px",
                        color: "#004c4c ",
                        marginLeft: "1rem",
                      }}
                    >
                      Applied
                    </span>
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
          </h5>
          <h6 className="card-subtitle">
            {user?.type === 0
              ? `Valid until ${format(new Date(offer.validDate), "yyyy-MM-dd")}`
              : offer.companyName}
          </h6>
        </div>

        {(user?.type === 1 || !isSmallScreen) && (
          <div
            className={`${user?.type === 1 ? "indigo lighten-5" : ""} ${
              isSmallScreen ? "row" : "col s3 right"
            }`}
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "4px",
              maxWidth: "300px",
              margin: isSmallScreen ? "0 1.5rem 1rem 0" : "0 20px",
            }}
          >
            {user?.type === 1 && (
              <p style={{ fontSize: "1.1rem", margin: "0" }}>
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
