import { useLocation } from "react-router";
import {
  CreateUserJobOfferDTO,
  JobOffer,
  JobPart,
  UserJobOffer,
} from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import JobOfferPart from "../../components/JobOfferPart";
import { useContext, useEffect, useState } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import { UserContext } from "../../context/UserContext";
import { format, isBefore } from "date-fns";
import { LoginModal } from "../../components/Modals/LoginModal";
import JobInformation from "../../components/JobInformation";
import usePost from "../../api/useDataPosting";
import { toastError } from "../../utils/toastUtils";

export default function JobOfferPage() {
  const location = useLocation();
  const offer: JobOffer = location.state?.offer;

  const { user, userJobOffers } = useContext(UserContext);
  const [userJobOffer, setUserJobOffer] = useState<UserJobOffer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: parts } = useFetch<JobPart[]>(
    `JobOffer/${offer.id_JobOffer}/parts`
  );

  const { error, responseData, postData } = usePost<
    CreateUserJobOfferDTO,
    UserJobOffer
  >("UserJobOffer");

  useEffect(() => {
    if (userJobOffers) {
      const foundOffer = userJobOffers.find(
        (o) => o.fk_JobOfferid_JobOffer === offer.id_JobOffer
      );
      setUserJobOffer(foundOffer || null);
    }
  }, [userJobOffers]);

  const handleApplyClick = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    postData({
      fk_JobOfferid_JobOffer: offer.id_JobOffer!,
      fk_Userid_User: user.id_User,
    });
  };

  useEffect(() => {
    if (responseData) {
      setUserJobOffer(responseData);
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError("Error, try again later :(");
    }
  }, [error]);

  return (
    <>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {offer && (
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className="row">
            <div className="col s12 m6 l7">
              <h4>{offer.name}</h4>
              <p>{offer.companyName}</p>
              <p style={{ margin: "0 2rem 0 0" }}>{offer.description}</p>
              {user?.type !== 0 && userJobOffer === null && (
                <button
                  className="btn-large indigo lighten-1"
                  style={{ margin: "2rem 0 0" }}
                  disabled={isBefore(offer.validDate, new Date())}
                  onClick={handleApplyClick}
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
                <JobInformation offer={offer} />
              </div>
            </div>
          </div>

          <div className="row">
            <h5 style={{ margin: "4rem 0 0rem" }}>
              Application steps{" "}
              {userJobOffer && (
                <StatusBadge status={userJobOffer.status.trim()} />
              )}
            </h5>
            <div style={{ margin: "1rem 0" }}>
              {userJobOffer && (
                <span>
                  Applied: {format(userJobOffer.applicationDate, "yyyy MM dd")}{" "}
                  |{" "}
                </span>
              )}
              <span>
                {isBefore(offer.validDate, new Date())
                  ? "No longer accepting applications"
                  : `Valid until: ${format(offer.validDate, "yyyy MM dd")}`}
              </span>
            </div>
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
                        applied={userJobOffer != null}
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
