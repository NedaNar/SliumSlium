import { useLocation } from "react-router";
import { getExperience, getPartTime, getRemote } from "../utils/enumUtils";
import { JobPart, UserJobOffer } from "../api/apiModel";
import useFetch from "../api/useDataFetching";
import JobOfferPart from "../components/JobOfferPart";
import { useAppliedOffers } from "../context/AppliedOffersContext";
import { useEffect, useState } from "react";
import { getBadgeBackground, getBadgeColor } from "../utils/colorUtils";

export default function JobOfferPage() {
  const location = useLocation();
  const offer = location.state?.offer;

  const [userJobOffer, setUserJobOffer] = useState<UserJobOffer | null>(null);

  const { data: parts } = useFetch<JobPart[]>(
    `JobOffer/${offer.id_JobOffer}/parts`
  );

  const { appliedOfferIds, appliedOffers } = useAppliedOffers();

  useEffect(() => {
    if (appliedOffers) {
      const foundOffer = appliedOffers.find(
        (o) => o.fk_JobOfferid_JobOffer === offer.id_JobOffer
      );
      setUserJobOffer(foundOffer || null);
    }
  }, [appliedOffers]);

  return (
    <>
      {offer && (
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className="row">
            <div className="col s12 m6 l7">
              <h4>{offer.name}</h4>
              <p>{offer.companyName}</p>
              <p style={{ margin: "0 2rem 0 0" }}>{offer.description}</p>
              {!appliedOfferIds.has(offer.id_JobOffer) && (
                <button
                  className="btn-large indigo lighten-1"
                  style={{ margin: "2rem 0 0" }}
                >
                  Apply
                </button>
              )}
            </div>

            <div className="col s12 m6 l5">
              <div
                className="card"
                style={{ padding: "1rem 2rem", marginTop: "2rem" }}
              >
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">place</i>
                  <strong>&nbsp;&nbsp;Location:&nbsp;</strong>
                  {offer.location}
                </div>
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">show_chart</i>
                  <strong>&nbsp;&nbsp;Experience:&nbsp;</strong>
                  {getExperience(offer.experienceLevel)}
                </div>
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">apartment</i>
                  <strong>&nbsp;&nbsp;Remote:&nbsp;</strong>
                  {getRemote(offer.workEnvironment)}
                </div>
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">schedule</i>
                  <strong>&nbsp;&nbsp;Part Time:&nbsp;</strong>
                  {getPartTime(offer.partTime)}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h5 style={{ margin: "4rem 0 0rem" }}>Application steps</h5>
            {userJobOffer && (
              <p>
                Applied on{" "}
                {new Date(userJobOffer.applicationDate).toLocaleDateString()}
                {userJobOffer && (
                  <span
                    style={{
                      backgroundColor: getBadgeBackground(
                        userJobOffer.status.trim()
                      ),
                      fontSize: "1rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "4px",
                      color: getBadgeColor(userJobOffer.status.trim()),
                      marginLeft: "1rem",
                    }}
                  >
                    Application {userJobOffer.status.toLowerCase()}
                  </span>
                )}
              </p>
            )}
            <div style={{ margin: "2rem 0 0rem" }}>
              {parts &&
                parts.map((part, index) => {
                  const isCurrentPart = userJobOffer
                    ? userJobOffer.currentPart === index + 1
                    : false;

                  return (
                    <>
                      <JobOfferPart
                        key={index}
                        part={part}
                        applied={appliedOfferIds.has(offer.id_JobOffer)}
                        isCurrent={isCurrentPart}
                      />
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
