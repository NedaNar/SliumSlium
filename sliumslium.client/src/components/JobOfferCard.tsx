import { JobOffer, UserJobOffer } from "../api/apiModel";
import { format } from "date-fns";
import "./jobOfferCard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import useFetch from "../api/useDataFetching";
import JobInformation from "./JobInformation";

interface JobOfferProps {
  offer: JobOffer;
  handleCardClick: () => void;
}

export default function JobOfferCard({
  offer,
  handleCardClick,
}: JobOfferProps) {
  const { user } = useContext(UserContext);
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

  const { data: appliedOffers } = useFetch<UserJobOffer[]>(
    user ? `UserJobOffer/${user.id_User}` : ""
  );

  return (
    <div className="card job-offer-card" onClick={handleCardClick}>
      <div
        className={`row ${isSmallScreen ? "" : "valign-wrapper"}`}
        style={{ padding: "0.5rem 2rem" }}
      >
        <div className={`${isSmallScreen ? "row" : "col s6"}`}>
          <h5 className="card-title">
            {offer.name}{" "}
            {user?.type === 1 &&
              appliedOffers &&
              appliedOffers.some(
                (off) => off.fk_JobOfferid_JobOffer === offer.id_JobOffer
              ) && (
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
          <h6 className="card-subtitle">
            {user?.type === 0
              ? `Valid until ${format(new Date(offer.validDate), "yyyy-MM-dd")}`
              : offer.companyName}
          </h6>
        </div>

        <div
          className={`${user?.type === 1 ? "indigo lighten-5" : ""} ${
            isSmallScreen ? "row" : "col s3 right"
          }`}
          style={{
            padding: "1rem 1.5rem",
            borderRadius: "4px",
            maxWidth: "300px",
            margin: isSmallScreen ? "0 auto 1rem 0" : "0",
          }}
        >
          {user?.type === 1 && (
            <p style={{ fontSize: "1.1rem", margin: "0" }}>
              From <strong>{offer.salary} €</strong>/month
            </p>
          )}{" "}
        </div>

        <div
          className={`${isSmallScreen ? "row" : "col s3 right"}`}
          style={{ padding: "0 0 0 2rem" }}
        >
          <JobInformation offer={offer} />
        </div>

        <i className="material-icons arrow-icon">chevron_right</i>
      </div>
    </div>
  );
}
