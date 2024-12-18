import { useParams } from "react-router";
import {
  CreateUserJobOfferDTO,
  JobOffer,
  UserJobOffer,
} from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import JobOfferPart from "../../components/JobOffer/JobOfferPart";
import { useContext, useEffect, useState } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import { UserContext } from "../../context/UserContext";
import { format, isBefore } from "date-fns";
import { LoginModal } from "../../components/Modals/LoginModal";
import JobInformation from "../../components/JobOffer/JobInformation";
import usePost from "../../api/useDataPosting";
import { toastError } from "../../utils/toastUtils";
import "./jobOfferPage.css";

export default function JobOfferPage() {
  const { id } = useParams();
  const { user, userJobOffers } = useContext(UserContext);
  const [userJobOffer, setUserJobOffer] = useState<UserJobOffer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: offer } = useFetch<JobOffer>(`JobOffer/${id}`);

  const { error, responseData, postData } = usePost<
    CreateUserJobOfferDTO,
    UserJobOffer
  >("UserJobOffer");

  useEffect(() => {
    if (userJobOffers && offer) {
      const foundOffer = userJobOffers.find(
        (o) => o.fk_JobOfferid_JobOffer === offer.id_JobOffer
      );
      setUserJobOffer(foundOffer || null);
    }
  }, [userJobOffers, offer]);

  const handleApplyClick = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    postData({
      fk_JobOfferid_JobOffer: offer!.id_JobOffer!,
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
        <div className="container jobOfferPage__box">
          <div className="row">
            <div className="col s12 m6 jobOfferPage__insideBox">
              <h1 className="jobOfferPage__job">{offer.name}</h1>
              <p>{offer.companyName}</p>
              <p className="jobOfferPage_desc">{offer.description}</p>
              {user?.type !== 0 && userJobOffer === null && (
                <>
                  <button
                    className="btn-large indigo lighten-1 jobOfferPage__applyBtn"
                    disabled={isBefore(offer.validDate, new Date())}
                    onClick={handleApplyClick}
                  >
                    Apply
                  </button>
                </>
              )}
            </div>

            <div className="col s12 m6 ">
              <div className="card jobOfferPage__offer">
                <JobInformation offer={offer} />
              </div>
            </div>
          </div>

          <div className="row">
            <h2 className="jobOfferPage__steps">
              Application steps{" "}
              {userJobOffer && (
                <StatusBadge
                  status={userJobOffer.status.trim()}
                  showTooltip={true}
                />
              )}
            </h2>
            <div className="jobOfferPage__applied">
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
            <div className="jobOfferPage__parts">
              {offer.parts &&
                offer.parts.map((part, index) => {
                  return (
                    <JobOfferPart
                      key={`${part.id_Part}-${index}`}
                      part={part}
                      partNumber={index + 1}
                      applied={userJobOffer != null}
                      currentPart={userJobOffer?.currentPart}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
