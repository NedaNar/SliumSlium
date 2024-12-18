import "./applicantPage.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Pagination from "./HomePage/Pagination";
import { JobOffer } from "../api/apiModel";
import useDelayedFetch from "../api/useDelayedDataFetching";

export function ApplicantPage() {
  const { user } = useContext(UserContext);

  const { data: offers, fetchData } = useDelayedFetch<JobOffer[]>(
    `JobOffer/applicant/${user?.id_User}`
  );

  useEffect(() => {
    if (user?.id_User) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      {user && (
        <>
          <h1 className="applPage__title">My profile</h1>
          <div className="card applPage__personalInfo">
            <p className="applPage__personalTitle">Personal information</p>
            <div className="row valign-wrapper applPage__personalRow">
              <i className="material-icons">person</i>
              <p className="applPage__text">{user.name}</p>
            </div>
            <div className="row valign-wrapper applPage__personalRow">
              <i className="material-icons">email</i>
              <p className="applPage__text">{user.email}</p>
            </div>
          </div>
          {offers && (
            <>
              <p className="applPage__applTitle">Applications</p>
              <Pagination jobOffers={offers} />
            </>
          )}
        </>
      )}
    </>
  );
}
